import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './entities/author.entity.js';
import { CreateAuthorDto } from './dto/create-author.dto.js';
import { UpdateAuthorDto } from './dto/update-author.dto.js';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private readonly authorsRepository: Repository<Author>,
  ) {}

  findAll(): Promise<Author[]> {
    return this.authorsRepository.find();
  }

  async findById(id: string): Promise<Author> {
    const author = await this.authorsRepository.findOne({ where: { id } });
    if (!author) throw new NotFoundException(`Penulis dengan id ${id} tidak ditemukan`);
    return author;
  }

  async create(input: CreateAuthorDto): Promise<Author> {
    const existing = await this.authorsRepository.findOne({
      where: { name: input.name },
    });
    if (existing) throw new ConflictException(`Penulis "${input.name}" sudah ada`);

    const author = this.authorsRepository.create(input);
    return this.authorsRepository.save(author);
  }

  async update(id: string, input: UpdateAuthorDto): Promise<Author> {
    const author = await this.findById(id);
    Object.assign(author, input);
    return this.authorsRepository.save(author);
  }

  async remove(id: string): Promise<boolean> {
    const author = await this.findById(id);
    await this.authorsRepository.remove(author);
    return true;
  }
}
