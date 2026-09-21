import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { BooksModule } from './books/books.module.js';
import { MembersModule } from './members/members.module.js';

@Module({
  imports: [BooksModule, MembersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
