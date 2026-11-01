import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'order_items' })
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne('Order', 'items')
  @JoinColumn({ name: 'order_id' })
  order: any;

  @ManyToOne('Book', 'orderItems')
  @JoinColumn({ name: 'book_id' })
  book: any;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  price: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  subtotal: number;
}
