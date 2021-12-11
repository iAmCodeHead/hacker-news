import { Controller, Get, UseInterceptors, ClassSerializerInterceptor, CacheInterceptor } from '@nestjs/common';
import { HackerNewsService } from './hacker-news.service';
import { CreateHackerNewDto } from './dto/create-hacker-new.dto';
import { UpdateHackerNewDto } from './dto/update-hacker-new.dto';

@Controller('hacker-news')
@UseInterceptors(ClassSerializerInterceptor)
export class HackerNewsController {
  constructor(private readonly hackerNewsService: HackerNewsService) {}

  @Get()
  mostOccuringInLast25() {
    return this.hackerNewsService.mostOccuringInLast25();
  }

  @Get('last-week')
  mostOccuringInTheLastWeek() {
    return this.hackerNewsService.postOfExactlyLastWeek();
  }

  @Get('top-users')
  mostOccuringInTheLast600() {
    return this.hackerNewsService.last600With10Karmas();
  }

}
