import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'customer_addresses' })
export class CustomerAddress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne('Customer', 'addresses')
  @JoinColumn({ name: 'customer_id' })
  customer: any;

  @Column({ type: 'varchar', length: 150, name: 'recipient_name' })
  recipientName: string;

  @Column({ type: 'varchar', length: 20 })
  phone: string;

  @Column({ type: 'text' })
  address: string;

  @Column({ type: 'varchar', length: 100 })
  city: string;

  @Column({ type: 'varchar', length: 10, name: 'postal_code' })
  postalCode: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
