import { CacheInterceptor, CacheModule, MiddlewareConsumer, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HackerNewsModule } from './hacker-news/hacker-news.module';
import LogsMiddleware from './middlewares/log.middleware';

@Module({
  // a basic implementation of caching to improve performance.
  imports: [
    CacheModule.register({
      ttl: 300, // expires every 5 minutes (300 seconds)
      max: 1000 // stores 1000 set of data
    }),
    HackerNewsModule
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_INTERCEPTOR,
    useClass: CacheInterceptor
  }],
})
export class AppModule {
  // configure logger globally
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LogsMiddleware)
      .forRoutes('*');
  }
}
