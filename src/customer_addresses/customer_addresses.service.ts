import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerAddress } from './entities/customer_address.entity.js';
import { CreateCustomerAddressDto } from './dto/create-customer-address.dto.js';
import { UpdateCustomerAddressDto } from './dto/update-customer-address.dto.js';

@Injectable()
export class CustomerAddressesService {
  constructor(
    @InjectRepository(CustomerAddress)
    private readonly addressRepository: Repository<CustomerAddress>,
  ) {}

  findAll(): Promise<CustomerAddress[]> {
    return this.addressRepository.find({ relations: { customer: true } });
  }

  async findById(id: string): Promise<CustomerAddress> {
    const address = await this.addressRepository.findOne({
      where: { id },
      relations: { customer: true },
    });
    if (!address) throw new NotFoundException(`Alamat dengan id ${id} tidak ditemukan`);
    return address;
  }

  findByCustomer(customerId: string): Promise<CustomerAddress[]> {
    return this.addressRepository.find({
      where: { customer: { id: customerId } },
    });
  }

  async create(input: CreateCustomerAddressDto): Promise<CustomerAddress> {
    const { customerId, ...rest } = input;
    const address = this.addressRepository.create({
      ...rest,
      customer: { id: customerId },
    });
    return this.addressRepository.save(address);
  }

  async update(id: string, input: UpdateCustomerAddressDto): Promise<CustomerAddress> {
    const address = await this.findById(id);
    Object.assign(address, input);
    return this.addressRepository.save(address);
  }

  async remove(id: string): Promise<boolean> {
    const address = await this.findById(id);
    await this.addressRepository.remove(address);
    return true;
  }
}
