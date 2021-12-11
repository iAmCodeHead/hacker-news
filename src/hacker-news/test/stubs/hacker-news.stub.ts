// import { newsType, story } from 'src/hacker-news/interfaces/hacker-news.interface';

import { newsType, story } from '../../interfaces/hacker-news.interface'

// To automatically generate enough mock data, faker can be used
const sampleNews = {
        "by": "rvnx",
        "descendants": 34,
        "id": 29516367,
        "kids": [
            29516942,
            29516887,
            29516869,
            29517378,
            29516569,
            29516402
        ],
        "score": 35,
        "time": 1639176166,
        "title": "Dutch man, 69, starts legal fight to identify as 20 years younger (2018)",
        "type": "story",
        "url": "https://www.theguardian.com/world/2018/nov/08/dutch-man-69-starts-legal-fight-to-identify-as-20-years-younger"
};

export const hackerNewsStub = (): story => {
    return sampleNews;
}