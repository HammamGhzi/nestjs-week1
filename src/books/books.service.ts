import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto.js';
import { UpdateBookDto } from './dto/update-book.dto.js';
import { Book } from './entities/book.entity.js';

@Injectable()
export class BooksService {
  private readonly books: Book[] = [];
  private nextId = 1;

  create(createBookDto: CreateBookDto): Book {
    const book: Book = { id: this.nextId++, title: createBookDto.title, author: createBookDto.author, isAvailable: createBookDto.isAvailable ?? true };
    this.books.push(book);
    return book;
  }

  findAll(): Book[] { return this.books; }

  findOne(id: number): Book {
    const book = this.books.find((item) => item.id === id);
    if (!book) throw new NotFoundException(`Buku dengan id ${id} tidak ditemukan`);
    return book;
  }

  update(id: number, updateBookDto: UpdateBookDto): Book {
    return Object.assign(this.findOne(id), updateBookDto);
  }

  remove(id: number): void {
    const book = this.findOne(id);
    this.books.splice(this.books.indexOf(book), 1);
  }

  borrow(id: number): Book {
    const book = this.findOne(id);
    if (!book.isAvailable) throw new BadRequestException('Buku sedang dipinjam!');
    book.isAvailable = false;
    return book;
  }

  returnBook(id: number): Book {
    const book = this.findOne(id);
    book.isAvailable = true;
    return book;
  }
}
