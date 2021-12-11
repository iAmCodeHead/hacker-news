import axios from "axios";
import { newsFilter, newsType } from "../hacker-news/interfaces/hacker-news.interface";



export class Processor {

    baseUrl: string;

    constructor() {
        this.baseUrl = process.env.HACKER_NEWS_URL;
    }
    
    callHackerNews = async(type: string, id:number|string)  => {

        let response: object;
    
        switch (type.toLowerCase()) {
    
          case newsType.STORY:
                
            response = await axios.get(`${this.baseUrl}/item/${id}.json`);
            
            return response["data"];
    
          case newsType.TOPSTORIES:
              
            response = await axios.get(`${this.baseUrl}/newstories.json`);
            
            return response["data"];

          case newsType.USERS:
            
            response = await axios.get(`${this.baseUrl}/user/${id}.json`);
            
            return response["data"];        

          default:
            break;
        }
    
    }

    private getUsersKarmas = async (userIds: Array<string>) => {
        
        const users = userIds.map((userId: string) => {
    
            return this.callHackerNews(newsType.USERS, userId["by"]);
      
          });
      
          let data = await Promise.all(users);
      
        return data; 
          
    }

    usersOverTenKarmas = async (stories: Array<any>) => {

      let map = {};

      /* convert this array in a hash table (objects) to avoid O(n^2)
      * complexity caused by nested loops. This will keep the complexity
      * at O(n)
      */

      for (let i = 0; i < stories.length; i++) {

        if(!map[i]) {

          const element = stories[i]["by"];
          
          map[element] = true;

        }

      }
      
        const usersWithKarma = await this.getUsersKarmas(stories);

        const karmaOver10 = usersWithKarma.filter((eachUser) => {
            if(eachUser["karma"] >= 10) {
                return eachUser;
            }
        });
              
      for (let j = 0; j < karmaOver10.length; j++) {
        const element = karmaOver10[j]["id"];
        if(map[element]) {
          stories[j]["karma"] = karmaOver10[j]["karma"];
        }
      }
        
        return stories;

    }

    getStories = async (storyIds: Array<number>) => {
      const story = storyIds.map((storyId: number) => {
    
        return this.callHackerNews(newsType.STORY, storyId);
  
      });
  
      const data = await Promise.all(story);

      return data;

    }

    getStoryTitle = (data: Array<any>) => {
      data = data.map((each) => {
    
        return each["title"];
  
      });
  
      return data; 
    }

    getStoryTimestamp = (data: Array<any>) => {
      data = data.map((each) => {
    
        return each["time"];
  
      });
                  
      return data;
    }

    getStoryAuthor = (data: Array<any>) => {
      data = data.map((each) => {
    
        return each["by"];
    
        });

      return data;
    }

    getTopStoryTitles = async(storyIds: Array<number>, key?: string) => {
    
      let data = await this.getStories(storyIds);

        switch (key) {

            case newsFilter.TITLE:

                data = this.getStoryTitle(data);

                return data;
              
            
            case newsFilter.TIME:

                data = this.getStoryTimestamp(data);

                return data;

 
            case newsFilter.AUTHOR:

                data = this.getStoryAuthor(data);

                return data;


            default:

                return data;
                
        }

      }

      titlesToArray = (titles: Array<string>) => {
        
        let arrayOfWords = titles[0].split(" ");
    
        for (let j = 1; j < titles.length; j++) {
    
          arrayOfWords = arrayOfWords.concat(titles[j].split(" "));
    
        }
        
        return arrayOfWords;

      }

      topTenOccuringWords = (arr: Array<string> = [], num: number = 10) => {
            
        const map = {};
        
        let keys = [];
        
        for (let i = 0; i < arr.length; i++) {
        
          if (map[arr[i]]) {
    
              map[arr[i]]++;
    
           } else {
    
              map[arr[i]] = 1;
    
           }
    
        }
    
        for (let i in map) {
    
           keys.push(i);
    
        }
    
        keys = keys.sort((a, b) => {
     
           if (map[a] === map[b]) {
     
              if (a > b) {
    
                 return 1;
    
              } else {
    
                 return -1;
    
              }
           } else {
    
              return map[b] - map[a];
    
           }
    
        })
        .slice(0, num);
            
        return keys;
    
      }

      convertTimestampToDate = (data: Array<any>) => {
          
         let dataWithDate = [];

          for (let i = 0; i < data.length; i++) {

            const element = data[i];
            
            if(element["time"]) {
                element["date"] = new Date(element["time"] * 1000);
                dataWithDate.push(element);
            }
              
        }
          
          return dataWithDate;
      }

      fetchLastweekDates = () => {

        const d = new Date();
        const to = d.setTime(d.getTime() - (d.getDay() + 1 ? d.getDay() + 1 : 7) * 24 * 60 * 60 * 1000);
        const from = d.setTime(d.getTime() - 6 * 24 * 60 * 60 * 1000);

        const lastWeekRange = {
            start: from,
            end: to
        };

        return lastWeekRange;

      }

      topTenOccuringWordsLastWeek = (data: Array<any>) => {

        const lastWeekNews = [];

        const dateRange: object = this.fetchLastweekDates();

        const convertedDataWithDate = this.convertTimestampToDate(data);
        
        // get data that falls between the timeframe for the last
        convertedDataWithDate.filter((eachData: object) => {
            if(Number(eachData["time"] * 1000) > Number(dateRange["start"]) && Number(eachData["time"] * 1000) < Number(dateRange["end"])) {
                lastWeekNews.push(eachData);
            }
        });
        
        return lastWeekNews;
      }

}
