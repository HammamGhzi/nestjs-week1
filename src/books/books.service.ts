import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity.js';
import { CreateBookDto } from './dto/create-book-dto.js';
import { UpdateBookDto } from './dto/update-book-dto.js';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly booksRepository: Repository<Book>,
  ) {}

  findAll(): Promise<Book[]> {
    return this.booksRepository.find({ relations: { category: true, publisher: true } });
  }

  async findById(id: string): Promise<Book> {
    const book = await this.booksRepository.findOne({
      where: { id },
      relations: { category: true, publisher: true, bookAuthors: { author: true } },
    });
    if (!book) throw new NotFoundException(`Buku dengan id ${id} tidak ditemukan`);
    return book;
  }

  async create(input: CreateBookDto): Promise<Book> {
    const existing = await this.booksRepository.findOne({
      where: { isbn: input.isbn },
    });
    if (existing) throw new ConflictException(`ISBN ${input.isbn} sudah terdaftar`);

    const { categoryId, publisherId, ...rest } = input;
    const book = this.booksRepository.create({
      ...rest,
      category: categoryId ? { id: categoryId } : null,
      publisher: publisherId ? { id: publisherId } : null,
    });
    return this.booksRepository.save(book);
  }

  async update(id: string, input: UpdateBookDto): Promise<Book> {
    const book = await this.findById(id);

    if (input.isbn && input.isbn !== book.isbn) {
      const existing = await this.booksRepository.findOne({
        where: { isbn: input.isbn },
      });
      if (existing) throw new ConflictException(`ISBN ${input.isbn} sudah digunakan`);
    }

    const { categoryId, publisherId, ...rest } = input;
    Object.assign(book, rest);

    if (categoryId !== undefined) {
      book.category = categoryId ? { id: categoryId } as any : null;
    }
    if (publisherId !== undefined) {
      book.publisher = publisherId ? { id: publisherId } as any : null;
    }

    return this.booksRepository.save(book);
  }

  async remove(id: string): Promise<boolean> {
    const book = await this.findById(id);
    await this.booksRepository.softRemove(book);
    return true;
  }
}
