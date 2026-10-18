import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateCategoryDto {
  @IsOptional()
  @IsNotEmpty({ message: 'Nama kategori tidak boleh kosong' })
  @IsString({ message: 'Nama kategori harus berupa teks' })
  @MaxLength(50, { message: 'Nama kategori maksimal 50 karakter' })
  readonly categoryName?: string;
}
