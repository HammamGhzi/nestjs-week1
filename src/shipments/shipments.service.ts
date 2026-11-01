import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shipment } from './entities/shipment.entity.js';
import { Order } from '../orders/entities/orders.entiity.js';
import { CreateShipmentDto } from './dto/create-shipment.dto.js';

@Injectable()
export class ShipmentsService {
  constructor(
    @InjectRepository(Shipment)
    private readonly shipmentsRepository: Repository<Shipment>,
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
  ) {}

  findAll(): Promise<Shipment[]> {
    return this.shipmentsRepository.find({ relations: { order: true } });
  }

  async findById(id: string): Promise<Shipment> {
    const shipment = await this.shipmentsRepository.findOne({
      where: { id },
      relations: { order: true },
    });
    if (!shipment) throw new NotFoundException(`Pengiriman dengan id ${id} tidak ditemukan`);
    return shipment;
  }

  async create(input: CreateShipmentDto): Promise<Shipment> {
    const order = await this.ordersRepository.findOne({
      where: { id: input.orderId },
      relations: { shipment: true },
    });
    if (!order) throw new NotFoundException(`Order dengan id ${input.orderId} tidak ditemukan`);
    if (order.shipment) throw new BadRequestException(`Order ini sudah memiliki data pengiriman`);

    const shipment = this.shipmentsRepository.create({
      order: { id: input.orderId },
      courier: input.courier,
      trackingNumber: input.trackingNumber ?? null,
      status: 'pending',
    });
    return this.shipmentsRepository.save(shipment);
  }

  async markShipped(id: string, trackingNumber?: string): Promise<Shipment> {
    const shipment = await this.findById(id);
    shipment.status = 'shipped';
    shipment.shippedAt = new Date();
    if (trackingNumber) shipment.trackingNumber = trackingNumber;
    await this.ordersRepository.update(shipment.order.id, { status: 'shipped' });
    return this.shipmentsRepository.save(shipment);
  }

  async markDelivered(id: string): Promise<Shipment> {
    const shipment = await this.findById(id);
    if (shipment.status !== 'shipped') throw new BadRequestException(`Pengiriman belum dalam status shipped`);
    shipment.status = 'delivered';
    shipment.deliveredAt = new Date();
    await this.ordersRepository.update(shipment.order.id, { status: 'completed' });
    return this.shipmentsRepository.save(shipment);
  }
}
