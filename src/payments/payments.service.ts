import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity.js';
import { Order } from '../orders/entities/orders.entiity.js';
import { CreatePaymentDto } from './dto/create-payment.dto.js';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentsRepository: Repository<Payment>,
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
  ) {}

  findAll(): Promise<Payment[]> {
    return this.paymentsRepository.find({ relations: { order: true } });
  }

  async findById(id: string): Promise<Payment> {
    const payment = await this.paymentsRepository.findOne({
      where: { id },
      relations: { order: true },
    });
    if (!payment) throw new NotFoundException(`Pembayaran dengan id ${id} tidak ditemukan`);
    return payment;
  }

  async create(input: CreatePaymentDto): Promise<Payment> {
    const order = await this.ordersRepository.findOne({
      where: { id: input.orderId },
      relations: { payment: true },
    });
    if (!order) throw new NotFoundException(`Order dengan id ${input.orderId} tidak ditemukan`);
    if (order.payment) throw new BadRequestException(`Order ini sudah memiliki pembayaran`);

    const payment = this.paymentsRepository.create({
      order: { id: input.orderId },
      paymentMethod: input.paymentMethod,
      amount: input.amount,
      status: 'pending',
    });
    return this.paymentsRepository.save(payment);
  }

  async confirmPayment(id: string): Promise<Payment> {
    const payment = await this.findById(id);
    if (payment.status === 'paid') throw new BadRequestException(`Pembayaran sudah dikonfirmasi`);
    payment.status = 'paid';
    payment.paidAt = new Date();

    // Update status order
    await this.ordersRepository.update(payment.order.id, { status: 'paid' });

    return this.paymentsRepository.save(payment);
  }
}
