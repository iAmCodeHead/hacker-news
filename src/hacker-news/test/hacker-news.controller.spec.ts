import { Test, TestingModule } from '@nestjs/testing';
import { Processor } from '../../utilities/utility';
import { newsType } from '../interfaces/hacker-news.interface';
import { hackerNewsStub } from './stubs/hacker-news.stub';

jest.mock('../hacker-news.service');

describe('Utilities', () => {
    let utility: Processor;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
        providers: [Processor],
      }).compile();

      utility = module.get<Processor>(Processor);
      jest.clearAllMocks();
  });

  // a test suited for some processor functions.
  
  describe('Fetch most occuring word in the last 25 stories', () => {
   
    describe('when callHackerNews() is called', () => {
   
        test('It should call the Hacker-news function', async () => {
            utility.callHackerNews(newsType.STORY, hackerNewsStub().id).then(response => {
                expect(response).toEqual(hackerNewsStub());
            });

        })

    })

    describe('when getStories() is called', () => {
   
        test('It should call the get stories function', () => {
            utility.getStories([hackerNewsStub().id]).then(response => {
                expect(response).toEqual(hackerNewsStub());
            });

        })

    })

    describe('when getStoryTitle() is called', () => {
   
        test('It should call the get title function', () => {

            expect(utility.getStoryTitle([hackerNewsStub()])).toEqual([hackerNewsStub().title]);

        })

    })

    describe('when getStoryTimestamp() is called', () => {
   
        test('It should call the get timestamp function', () => {

            expect(utility.getStoryTimestamp([hackerNewsStub()])).toEqual([hackerNewsStub().time]);

        })

    })

    describe('when getStoryAuthor() is called', () => {
   
        test('It should call the getStoryAuthor function', () => {

            expect(utility.getStoryAuthor([hackerNewsStub()])).toEqual([hackerNewsStub().by]);

        })

    })

    describe('when titlesToArray() is called', () => {
   
        test('It should call the titlesToArray function', () => {

            const splittedTitle = hackerNewsStub().title.split(" ");

            expect(utility.titlesToArray([hackerNewsStub().title])).toEqual(splittedTitle);

        })

    })

})

});