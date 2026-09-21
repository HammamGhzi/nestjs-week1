import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { BooksService } from './books.service.js';
import { CreateBookDto } from './dto/create-book.dto.js';
import { UpdateBookDto } from './dto/update-book.dto.js';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) { return this.booksService.create(createBookDto); }

  @Get()
  findAll() { return this.booksService.findAll(); }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) { return this.booksService.findOne(id); }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateBookDto: UpdateBookDto) { return this.booksService.update(id, updateBookDto); }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseIntPipe) id: number): void { this.booksService.remove(id); }

  @Patch(':id/borrow')
  borrow(@Param('id', ParseIntPipe) id: number) { return this.booksService.borrow(id); }

  @Patch(':id/return')
  returnBook(@Param('id', ParseIntPipe) id: number) { return this.booksService.returnBook(id); }
}
