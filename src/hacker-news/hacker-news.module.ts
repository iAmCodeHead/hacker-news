import { Module } from '@nestjs/common';
import { HackerNewsService } from './hacker-news.service';
import { HackerNewsController } from './hacker-news.controller';
import { Processor } from 'src/utilities/utility';

@Module({
  controllers: [HackerNewsController],
  providers: [
    HackerNewsService, {
    provide: "HACKERNEWS_PROCESSOR",
    useClass: Processor
  }]
})
export class HackerNewsModule {}
