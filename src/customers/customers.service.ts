import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity.js';
import { CreateCustomerDto } from './dto/create-customer.dto.js';
import { UpdateCustomerDto } from './dto/update-customer.dto.js';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customersRepository: Repository<Customer>,
  ) {}

  findAll(): Promise<Customer[]> {
    return this.customersRepository.find({ relations: { addresses: true } });
  }

  async findById(id: string): Promise<Customer> {
    const customer = await this.customersRepository.findOne({
      where: { id },
      relations: { addresses: true },
    });
    if (!customer) throw new NotFoundException(`Customer dengan id ${id} tidak ditemukan`);
    return customer;
  }

  async create(input: CreateCustomerDto): Promise<Customer> {
    const existing = await this.customersRepository.findOne({
      where: { email: input.email },
    });
    if (existing) throw new ConflictException(`Email ${input.email} sudah terdaftar`);

    const customer = this.customersRepository.create(input);
    return this.customersRepository.save(customer);
  }

  async update(id: string, input: UpdateCustomerDto): Promise<Customer> {
    const customer = await this.findById(id);
    Object.assign(customer, input);
    return this.customersRepository.save(customer);
  }

  async remove(id: string): Promise<boolean> {
    const customer = await this.findById(id);
    await this.customersRepository.softRemove(customer);
    return true;
  }
}
