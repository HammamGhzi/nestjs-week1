import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from './entities/categories.entity.js';
import { CreateCategoryDto } from './dto/create-category-dto.js';
import { UpdateCategoryDto } from './dto/update-category-dto.js';

@Injectable()
export class CategoriesService {
  private readonly categories: Category[] = [
    { id: 1, categoryName: 'Fiksi' },
    { id: 2, categoryName: 'Nonfiksi' },
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
    const category: Category = {
      id: this.categories.length ? Math.max(...this.categories.map((item) => item.id)) + 1 : 1,
      categoryName: input.categoryName,
    };
    this.categories.push(category);
    return category;
  }

  update(id: number, input: UpdateCategoryDto): Category {
    const category = this.findById(id);
    Object.assign(category, input);
    return category;
  }

  remove(id: number): boolean {
    const index = this.categories.findIndex((item) => item.id === id);
    if (index === -1) throw new NotFoundException(`Category with id ${id} not found`);
    this.categories.splice(index, 1);
    return true;
  }
}
