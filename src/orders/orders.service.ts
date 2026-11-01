import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Order } from './entities/orders.entiity.js';
import { OrderItem } from '../order_items/entities/order_item.entity.js';
import { Book } from '../books/entities/book.entity.js';
import { CreateOrderDto } from './dto/create-order.dto.js';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto.js';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemsRepository: Repository<OrderItem>,
    @InjectRepository(Book)
    private readonly booksRepository: Repository<Book>,
    private readonly dataSource: DataSource,
  ) {}

  findAll(): Promise<Order[]> {
    return this.ordersRepository.find({
      relations: { customer: true, items: { book: true } },
    });
  }

  async findById(id: string): Promise<Order> {
    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: { customer: true, items: { book: true }, payment: true, shipment: true },
    });
    if (!order) throw new NotFoundException(`Order dengan id ${id} tidak ditemukan`);
    return order;
  }

  async create(input: CreateOrderDto): Promise<Order> {
    return this.dataSource.transaction(async (manager) => {
      const orderRepo = manager.getRepository(Order);
      const bookRepo = manager.getRepository(Book);
      const itemRepo = manager.getRepository(OrderItem);

      let totalAmount = 0;
      const orderItems: OrderItem[] = [];

      for (const itemDto of input.items) {
        const book = await bookRepo.findOne({ where: { id: itemDto.bookId } });
        if (!book) throw new NotFoundException(`Buku dengan id ${itemDto.bookId} tidak ditemukan`);
        if (book.stock < itemDto.quantity) {
          throw new BadRequestException(`Stok buku "${book.title}" tidak mencukupi (tersedia: ${book.stock})`);
        }

        const price = Number(book.price);
        const subtotal = price * itemDto.quantity;
        totalAmount += subtotal;

        // Kurangi stok
        book.stock -= itemDto.quantity;
        await bookRepo.save(book);

        const item = itemRepo.create({
          book: { id: itemDto.bookId },
          quantity: itemDto.quantity,
          price,
          subtotal,
        });
        orderItems.push(item);
      }

      const order = orderRepo.create({
        customer: { id: input.customerId },
        orderNumber: input.orderNumber,
        status: 'pending',
        totalAmount,
      });
      const savedOrder = await orderRepo.save(order);

      for (const item of orderItems) {
        item.order = savedOrder;
        await itemRepo.save(item);
      }

      return orderRepo.findOneOrFail({
        where: { id: savedOrder.id },
        relations: { customer: true, items: { book: true } },
      });
    });
  }

  async updateStatus(id: string, input: UpdateOrderStatusDto): Promise<Order> {
    const order = await this.findById(id);
    order.status = input.status;
    return this.ordersRepository.save(order);
  }

  async remove(id: string): Promise<boolean> {
    const order = await this.findById(id);
    await this.ordersRepository.remove(order);
    return true;
  }
}
