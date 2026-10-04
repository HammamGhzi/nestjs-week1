import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './entities/book.entity.js';
import { CreateBookDto } from './dto/create-book-dto.js';
import { UpdateBookDto } from './dto/update-book-dto.js';

@Injectable()
export class BooksService {
    private books: Book[] = [
        {
            id: 1,
            title: 'Buku 1',
            author: 'Penulis 1',
            isbn: '1234567890',
            publisher: 'Penerbit 1',
            isAvailable: true
        },
        {
            id: 2,
            title: 'Buku 2',
            author: 'Penulis 2',
            isbn: '0987654321',
            publisher: 'Penerbit 2',
            isAvailable: false
        
        }
    ];

    // menampilkan semua data buku
    findAll(): Book[] {
        return this.books;
    }
    // menyimpan data buku
    create(inputBook:CreateBookDto): Book {
     const newBook: Book = {
        id: this.books.length ? Math.max(...this.books.map(book => book.id)) + 1 : 1,
        title: inputBook.title,
        author: inputBook.author,
        isbn: inputBook.isbn,
        publisher: inputBook.publisher,
        isAvailable: inputBook.isAvailable ?? true
    };
    this.books.push(newBook);
    return newBook;
}
    // menamppilkan data buku berdasarkan id
    findById(id: number): Book {
        const book = this.books.find(book => book.id === id);
        if (!book) {
            throw new NotFoundException(`Book with id ${id} not found`);
        }
        return book;
    }
    // mengupdate data buku berdasarkan id
    update(id: number, updateBookDto: UpdateBookDto): Book {
        const bookIndex = this.books.findIndex(book => book.id === id);
        if (bookIndex === -1) {
            throw new NotFoundException(`Book with id ${id} not found`);
        }
        const updatedBook: Book = {
            ...this.books[bookIndex],
            ...updateBookDto,
        };
        this.books[bookIndex] = updatedBook;
        return updatedBook;
    }
    // menghapus data buku berdasarkan id
    remove(id: number): boolean {
        const bookIndex = this.books.findIndex(book => book.id === id);
        if (bookIndex === -1) {
            throw new NotFoundException(`Book with id ${id} not found`);
        }
        this.books.splice(bookIndex, 1);
        return true;
    }
}
