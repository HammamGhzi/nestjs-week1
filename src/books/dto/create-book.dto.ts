import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateBookDto {
  @IsNotEmpty({ message: 'Judul harus diisi' })
  @IsString({ message: 'Title must be a string' })
  readonly title: string;

  @IsNotEmpty({ message: 'Author is required' })
  @IsString({ message: 'Author must be a string' })
  readonly author: string;

  @IsNotEmpty({ message: 'ISBN is required' })
  @IsString({ message: 'ISBN must be a string' })
  readonly isbn: string;

  @IsNotEmpty({ message: 'Publisher is required' })
  @IsNumber({}, { message: 'Publisher must be a number' })
  @Type(() => Number)
  readonly publisher: number;

  @IsOptional()
  @IsBoolean({ message: 'Availability must be a boolean' })
  readonly isAvailable?: boolean;
}
