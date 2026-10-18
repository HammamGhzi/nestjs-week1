export class Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  publisher: string;
  isAvailable: boolean;

  constructor(partial: Partial<Book>) {
    Object.assign(this, partial);
  }
}