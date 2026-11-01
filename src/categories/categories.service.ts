import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Category } from './entities/categories.entity.js';
import { CreateCategoryDto } from './dto/create-category-dto.js';
import { UpdateCategoryDto } from './dto/update-category-dto.js';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  findAll(): Promise<Category[]> {
    return this.categoriesRepository.find();
  }

  async findById(id: string): Promise<Category> {
    const category = await this.categoriesRepository.findOne({ where: { id } });
    if (!category) throw new NotFoundException(`Category dengan id ${id} tidak ditemukan`);
    return category;
  }

  async create(input: CreateCategoryDto): Promise<Category> {
    const existing = await this.categoriesRepository.findOne({
      where: { name: input.categoryName },
    });
    if (existing) throw new ConflictException(`Kategori "${input.categoryName}" sudah terdaftar`);

    const category = this.categoriesRepository.create({ name: input.categoryName });
    return this.categoriesRepository.save(category);
  }

  async update(id: string, input: UpdateCategoryDto): Promise<Category> {
    const category = await this.findById(id);

    if (input.categoryName) {
      const existing = await this.categoriesRepository.findOne({
        where: { name: input.categoryName, id: Not(id) },
      });
      if (existing) throw new ConflictException(`Kategori "${input.categoryName}" sudah terdaftar`);
      category.name = input.categoryName;
    }

    return this.categoriesRepository.save(category);
  }

  async remove(id: string): Promise<boolean> {
    const category = await this.findById(id);
    await this.categoriesRepository.remove(category);
    return true;
  }
}
