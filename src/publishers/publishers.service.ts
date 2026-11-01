import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Publisher } from './entities/publisher.entity.js';
import { CreatePublisherDto } from './dto/create-publisher.dto.js';
import { UpdatePublisherDto } from './dto/update-publisher.dto.js';

@Injectable()
export class PublishersService {
  constructor(
    @InjectRepository(Publisher)
    private readonly publishersRepository: Repository<Publisher>,
  ) {}

  findAll(): Promise<Publisher[]> {
    return this.publishersRepository.find();
  }

  async findById(id: string): Promise<Publisher> {
    const publisher = await this.publishersRepository.findOne({ where: { id } });
    if (!publisher) throw new NotFoundException(`Penerbit dengan id ${id} tidak ditemukan`);
    return publisher;
  }

  async create(input: CreatePublisherDto): Promise<Publisher> {
    const existing = await this.publishersRepository.findOne({
      where: { name: input.name },
    });
    if (existing) throw new ConflictException(`Penerbit "${input.name}" sudah ada`);

    const publisher = this.publishersRepository.create(input);
    return this.publishersRepository.save(publisher);
  }

  async update(id: string, input: UpdatePublisherDto): Promise<Publisher> {
    const publisher = await this.findById(id);
    Object.assign(publisher, input);
    return this.publishersRepository.save(publisher);
  }

  async remove(id: string): Promise<boolean> {
    const publisher = await this.findById(id);
    await this.publishersRepository.remove(publisher);
    return true;
  }
}
