import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'Nama kategori wajib diisi' })
  @IsString({ message: 'Nama kategori harus berupa teks' })
  @MaxLength(50, { message: 'Nama kategori maksimal 50 karakter' })
  readonly categoryName: string;
}
