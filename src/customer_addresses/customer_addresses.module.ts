import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerAddress } from './entities/customer_address.entity.js';
import { CustomerAddressesController } from './customer_addresses.controller.js';
import { CustomerAddressesService } from './customer_addresses.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerAddress])],
  controllers: [CustomerAddressesController],
  providers: [CustomerAddressesService],
  exports: [CustomerAddressesService],
})
export class CustomerAddressesModule {}
