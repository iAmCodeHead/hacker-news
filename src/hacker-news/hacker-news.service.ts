import { HttpException, Inject, Injectable, Logger } from '@nestjs/common';
import { newsFilter, newsType } from './interfaces/hacker-news.interface';

@Injectable()
export class HackerNewsService {

  baseUrl: string;
  stories: Array<number>
  private readonly logger = new Logger(HackerNewsService.name)

  constructor(
    @Inject('HACKERNEWS_PROCESSOR') private readonly processor,
  ) { this.OnInit() }

  // all methods have this Api call in common
  // running this in the constructor automatically makes the call and saves the data 
  // on initialization
  async OnInit() {
    
    this.stories = await this.processor.callHackerNews(newsType.TOPSTORIES, null);

  }

  async mostOccuringInLast25(): Promise<any> {

    try {

      let lastTwentyFive: Array<number>;

      lastTwentyFive = this.stories;
  
      lastTwentyFive = lastTwentyFive.slice(-25);
  
      const titles = await this.processor.getTopStoryTitles(lastTwentyFive, newsFilter.TITLE);
        
      const arrayOfWords = this.processor.titlesToArray(titles);
  
      const topTenWords = this.processor.topTenOccuringWords(arrayOfWords, 10)
          
      return topTenWords;
      
    } catch (error) {
      
      return new Error("Internal Server Error");

    }


  }

  async postOfExactlyLastWeek() {

    try {
      
      const stories = this.stories;

      const titles = await this.processor.getTopStoryTitles(stories);
      
      const topTenWords = await this.processor.topTenOccuringWordsLastWeek(titles);
      
      return topTenWords;

    } catch (error) {
      
      return new HttpException("Internal Server Error",500);

    }

  }

  async last600With10Karmas() {

    try {
      
      const stories = this.stories;

      const getStoryDetails = await this.processor.getTopStoryTitles(stories);
      
      const storyIds = await this.processor.usersOverTenKarmas(getStoryDetails);

      const titles = this.processor.getStoryTitle(storyIds);
      
      const arrayOfWords = this.processor.titlesToArray(titles);
  
      const topTenWords = this.processor.topTenOccuringWords(arrayOfWords, 10)
      
      return topTenWords;
      
    } catch (error) {
      
      return new HttpException("Internal Server Error",500);

    }

  }

}
