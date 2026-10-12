import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { BooksModule } from './books/books.module.js';
import { MembersModule } from './members/members.module.js';
import { CategoriesModule } from './categories/categories.module.js';
import { AuthModule } from './auth/auth.module.js';
import { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { SimpleLoggerMiddleware } from './middleware/simple-logger/simple-logger.middleware.js';

@Module({
  imports: [BooksModule, MembersModule, CategoriesModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SimpleLoggerMiddleware).forRoutes('*');
}
}
