import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './entities/book.entity.js';
import { CreateBookDto } from './dto/create-book-dto.js';
import { UpdateBookDto } from './dto/update-book-dto.js';

@Injectable()
export class BooksService {
  // wajib memakai new Book(...) agar konsisten sebagai instance class
  private readonly books: Book[] = [
    new Book({ id: 1, title: 'Buku 1', author: 'Penulis 1', isbn: '1234567890', publisher: 'Penerbit 1', isAvailable: true }),
    new Book({ id: 2, title: 'Buku 2', author: 'Penulis 2', isbn: '0987654321', publisher: 'Penerbit 2', isAvailable: false }),
  ];

  // menampilkan semua data buku
  findAll(): Book[] {
    return this.books;
  }

  // menampilkan data buku berdasarkan id
  findById(id: number): Book {
    const book = this.books.find((item) => item.id === id);
    if (!book) throw new NotFoundException(`Book with id ${id} not found`);
    return book;
  }

  // menyimpan data buku
  create(input: CreateBookDto): Book {
    if (this.books.some((item) => item.isbn === input.isbn)) {
      throw new ConflictException(`Buku dengan ISBN ${input.isbn} sudah terdaftar.`);
    }
    const book = new Book({
      id: this.books.length ? Math.max(...this.books.map((item) => item.id)) + 1 : 1,
      title: input.title,
      author: input.author,
      isbn: input.isbn,
      publisher: input.publisher,
      isAvailable: input.isAvailable ?? true,
    });
    this.books.push(book);
    return book;
  }

  // mengupdate data buku berdasarkan id
  update(id: number, input: UpdateBookDto): Book {
    const book = this.findById(id);
    if (input.isbn && this.books.some((item) => item.isbn === input.isbn && item.id !== id)) {
      throw new ConflictException(`Buku dengan ISBN ${input.isbn} sudah terdaftar.`);
    }
    // abaikan field undefined agar tidak menimpa data lama
    Object.assign(
      book,
      Object.fromEntries(Object.entries(input).filter(([, value]) => value !== undefined)),
    );
    return book;
  }

  // menghapus data buku berdasarkan id
  remove(id: number): boolean {
    const index = this.books.findIndex((item) => item.id === id);
    if (index === -1) throw new NotFoundException(`Book with id ${id} not found`);
    this.books.splice(index, 1);
    return true;
  }
}
