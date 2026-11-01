import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'payments' })
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne('Order', 'payment')
  @JoinColumn({ name: 'order_id' })
  order: any;

  @Column({ type: 'varchar', length: 50, name: 'payment_method' })
  paymentMethod: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  amount: number;

  @Column({ type: 'varchar', length: 30, default: 'pending' })
  status: string;

  @Column({ type: 'timestamp', nullable: true, name: 'paid_at' })
  paidAt: Date | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
