import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne('Customer', 'orders')
  @JoinColumn({ name: 'customer_id' })
  customer: any;

  @Column({ type: 'varchar', length: 50, unique: true, name: 'order_number' })
  orderNumber: string;

  @Column({ type: 'varchar', length: 30, default: 'pending' })
  status: string;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0, name: 'total_amount' })
  totalAmount: number;

  @OneToMany('OrderItem', 'order')
  items: any[];

  @OneToOne('Payment', 'order')
  payment: any;

  @OneToOne('Shipment', 'order')
  shipment: any;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
