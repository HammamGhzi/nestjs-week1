import { IsIn, IsNotEmpty, IsNumber, IsPositive, IsString, IsUUID, MaxLength } from 'class-validator';

const VALID_METHODS = ['transfer', 'credit_card', 'cash', 'e_wallet', 'cod'] as const;

export class CreatePaymentDto {
  @IsUUID()
  orderId: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @IsIn(VALID_METHODS, { message: `Metode pembayaran tidak valid` })
  paymentMethod: string;

  @IsNumber()
  @IsPositive()
  amount: number;
}
