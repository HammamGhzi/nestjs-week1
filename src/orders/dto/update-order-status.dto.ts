import { IsIn, IsNotEmpty, IsString } from 'class-validator';

const VALID_STATUSES = ['pending', 'paid', 'processing', 'shipped', 'completed', 'cancelled'] as const;

export class UpdateOrderStatusDto {
  @IsNotEmpty()
  @IsString()
  @IsIn(VALID_STATUSES, {
    message: `Status harus salah satu dari: ${VALID_STATUSES.join(', ')}`,
  })
  status: string;
}
