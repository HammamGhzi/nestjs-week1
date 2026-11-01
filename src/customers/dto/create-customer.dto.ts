import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty({ message: 'Nama tidak boleh kosong' })
  @IsString()
  @MaxLength(150)
  name: string;

  @IsEmail({}, { message: 'Format email tidak valid' })
  @MaxLength(150)
  email: string;

  @IsNotEmpty({ message: 'Nomor telepon tidak boleh kosong' })
  @IsString()
  @MaxLength(20)
  phone: string;
}
