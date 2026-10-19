import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateBookDto {
  @IsNotEmpty({ message: 'Judul buku wajib diisi' })
  @IsString({ message: 'Judul buku harus berupa teks' })
  readonly title: string;

  @IsNotEmpty({ message: 'Nama penulis wajib diisi' })
  @IsString({ message: 'Nama penulis harus berupa teks' })
  readonly author: string;

  @IsNotEmpty({ message: 'ISBN wajib diisi' })
  @IsString({ message: 'ISBN harus berupa teks' })
  readonly isbn: string;

  @IsNotEmpty({ message: 'Penerbit wajib diisi' })
  @IsNumber({}, { message: 'Penerbit harus berupa angka' })
  @Type(() => Number)
  readonly publisher: number;

  @IsOptional()
  @IsBoolean({ message: 'Status ketersediaan harus berupa true atau false' })
  readonly isAvailable?: boolean;
}
