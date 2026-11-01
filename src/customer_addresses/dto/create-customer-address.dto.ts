import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreateCustomerAddressDto {
  @IsUUID()
  customerId: string;

  @IsNotEmpty({ message: 'Nama penerima tidak boleh kosong' })
  @IsString()
  @MaxLength(150)
  recipientName: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  phone: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  city: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(10)
  postalCode: string;
}
