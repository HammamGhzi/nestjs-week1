export class Category {
  id: number;
  categoryName: string;

  constructor(partial: Partial<Category>) {
    Object.assign(this, partial);
  }
}
