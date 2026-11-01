import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity({ name: 'book_authors' })
export class BookAuthor {
  @PrimaryColumn({ type: 'uuid', name: 'book_id' })
  bookId: string;

  @PrimaryColumn({ type: 'uuid', name: 'author_id' })
  authorId: string;

  @ManyToOne('Book', 'bookAuthors')
  @JoinColumn({ name: 'book_id' })
  book: any;

  @ManyToOne('Author', 'bookAuthors')
  @JoinColumn({ name: 'author_id' })
  author: any;
}
