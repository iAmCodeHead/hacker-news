import { hackerNewsStub } from "../test/stubs/hacker-news.stub";

export const TransactionCategoryService = jest.fn().mockReturnValue({
    mostOccuringInLast25: jest.fn().mockResolvedValue(hackerNewsStub()),
    postOfExactlyLastWeek: jest.fn().mockResolvedValue(hackerNewsStub()),
    last600With10Karmas: jest.fn().mockResolvedValue(hackerNewsStub())
})