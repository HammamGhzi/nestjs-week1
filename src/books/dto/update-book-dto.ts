import {
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  @MaxLength(30)
  readonly title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(45)
  readonly isbn?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  readonly publishedYear?: number;

  @IsOptional()
  @IsBoolean()
  readonly isAvailable?: boolean;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  readonly price?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  readonly stock?: number;

  @IsOptional()
  @IsUUID()
  readonly categoryId?: string;

  @IsOptional()
  @IsUUID()
  readonly publisherId?: string;
}
