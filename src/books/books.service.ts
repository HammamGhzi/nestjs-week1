import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './entities/book.entity.js';
import { CreateBookDto } from './dto/create-book-dto.js';
import { UpdateBookDto } from './dto/update-book-dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  // menampilkan semua data buku
  async findAll(): Promise<Book[]> {
    return await this.bookRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  // menampilkan data buku berdasarkan id
  async findById(id: string): Promise<Book> {
    const book = await this.bookRepository.findOneBy({ id });
    if (!book) {
      throw new NotFoundException(`Buku dengan ID ${id} tidak ditemukan`);
    }
    return book;
  }

  // menyimpan data buku
  async create(input: CreateBookDto): Promise<Book> {
    const newBook = this.bookRepository.create(input);
    return await this.bookRepository.save(newBook);
  }

  // mengupdate data buku berdasarkan id
  async update(id: string, input: UpdateBookDto): Promise<Book> {
    const book = await this.findById(id);
    const updatedBook = this.bookRepository.merge(book, input);
    return await this.bookRepository.save(updatedBook);
  }

  // menghapus data buku berdasarkan id
  async remove(id: string): Promise<{ message: string; deleteId: string }> {
    const book = await this.findById(id);
    await this.bookRepository.remove(book);
    return { message: `Buku dengan ID ${id} berhasil dihapus`, deleteId: id };
  }
}
