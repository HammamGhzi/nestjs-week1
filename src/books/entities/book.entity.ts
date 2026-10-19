import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name:'books'})
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type : 'varchar', length : 30})
  title: string;
  
  @Column({type : 'varchar', length : 25})
  author: string;

  @Column({type : 'varchar', length : 45})
  isbn: string;

  @Column({type : 'int', default: 0})
  publisher: number;

  @Column({type : 'boolean', default: true})
  isAvailable: boolean;


  @CreateDateColumn({name : 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({name : 'updated_at'})
  updatedAt: Date;

  
  constructor(partial: Partial<Book>) {
    Object.assign(this, partial);
  }
}