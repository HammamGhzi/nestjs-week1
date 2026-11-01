import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookAuthor } from './entities/book_author.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([BookAuthor])],
  exports: [TypeOrmModule],
})
export class BookAuthorsModule {}
