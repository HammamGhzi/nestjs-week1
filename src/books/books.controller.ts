import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Delete } from '@nestjs/common';
import { BooksService } from './books.service.js';
import { CreateBookDto } from './dto/create-book-dto.js';
import { UpdateBookDto } from './dto/update-book-dto.js';

@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) {}
    // menampilkan data 
    @Get()
    findAll() {
        return this.booksService.findAll();
    }
    // menampilkan data buku berdasarkan id
    @Get(':id')
    findById(@Param('id', ParseIntPipe) id: number) {
        return this.booksService.findById(id);
    }
    @Post()
    create(@Body() createBookDto: CreateBookDto) {
        // kirim aksi simpan ke service
        return this.booksService.create(createBookDto);
        
   
    }
    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateBookDto: UpdateBookDto) {
        // kirim aksi update ke service
        return this.booksService.update(id, updateBookDto);
        
    }
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        // kirim aksi hapus ke service
        return this.booksService.remove(id);
    }

}
