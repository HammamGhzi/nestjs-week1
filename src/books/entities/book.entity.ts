import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'books' })
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 30 })
  title: string;

  @Column({ type: 'varchar', length: 45, unique: true })
  isbn: string;

  @Column({ type: 'int', default: 0, name: 'published_year' })
  publishedYear: number;

  @Column({ type: 'boolean', default: true, name: 'is_available' })
  isAvailable: boolean;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  price: number;

  @Column({ type: 'int', default: 0 })
  stock: number;

  @ManyToOne('Category', 'books', { nullable: true })
  @JoinColumn({ name: 'category_id' })
  category: any;

  @ManyToOne('Publisher', 'books', { nullable: true })
  @JoinColumn({ name: 'publisher_id' })
  publisher: any;

  @OneToMany('BookAuthor', 'book')
  bookAuthors: any[];

  @OneToMany('OrderItem', 'book')
  orderItems: any[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date | null;
}
