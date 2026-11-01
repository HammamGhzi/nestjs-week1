import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty({ message: 'Judul buku wajib diisi' })
  @IsString({ message: 'Judul buku harus berupa teks' })
  @MaxLength(30)
  readonly title: string;

  @IsNotEmpty({ message: 'ISBN wajib diisi' })
  @IsString({ message: 'ISBN harus berupa teks' })
  @MaxLength(45)
  readonly isbn: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  readonly publishedYear?: number;

  @IsOptional()
  @IsBoolean({ message: 'Status ketersediaan harus berupa true atau false' })
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
