import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Category } from './entities/categories.entity.js';
import { CreateCategoryDto } from './dto/create-category-dto.js';
import { UpdateCategoryDto } from './dto/update-category-dto.js';

@Injectable()
export class CategoriesService {
  // wajib memakai new Category(...) agar konsisten sebagai instance class
  private readonly categories: Category[] = [
    new Category({ id: 1, categoryName: 'Fiksi' }),
    new Category({ id: 2, categoryName: 'Nonfiksi' }),
  ];

  findAll(): Category[] {
    return this.categories;
  }

  findById(id: number): Category {
    const category = this.categories.find((item) => item.id === id);
    if (!category) throw new NotFoundException(`Category with id ${id} not found`);
    return category;
  }

  create(input: CreateCategoryDto): Category {
    this.ensureNameUnique(input.categoryName);
    const category = new Category({
      id: this.categories.length ? Math.max(...this.categories.map((item) => item.id)) + 1 : 1,
      categoryName: input.categoryName,
    });
    this.categories.push(category);
    return category;
  }

  update(id: number, input: UpdateCategoryDto): Category {
    const category = this.findById(id);
    if (input.categoryName) this.ensureNameUnique(input.categoryName, id);
    // abaikan field undefined agar tidak menimpa data lama
    Object.assign(
      category,
      Object.fromEntries(Object.entries(input).filter(([, value]) => value !== undefined)),
    );
    return category;
  }

  remove(id: number): boolean {
    const index = this.categories.findIndex((item) => item.id === id);
    if (index === -1) throw new NotFoundException(`Category with id ${id} not found`);
    this.categories.splice(index, 1);
    return true;
  }

  private ensureNameUnique(name: string, exceptId?: number): void {
    const exists = this.categories.some(
      (item) => item.categoryName.toLowerCase() === name.toLowerCase() && item.id !== exceptId,
    );
    if (exists) throw new ConflictException(`Kategori ${name} sudah terdaftar.`);
  }
}
