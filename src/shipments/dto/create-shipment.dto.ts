import { IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreateShipmentDto {
  @IsUUID()
  orderId: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  courier: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  trackingNumber?: string;
}
