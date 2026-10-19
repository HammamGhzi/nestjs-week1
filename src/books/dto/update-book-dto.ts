import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateBookDto {
  @IsOptional()
  @IsNotEmpty({ message: 'Judul buku tidak boleh kosong' })
  @IsString({ message: 'Judul buku harus berupa teks' })
  readonly title?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Nama penulis tidak boleh kosong' })
  @IsString({ message: 'Nama penulis harus berupa teks' })
  readonly author?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'ISBN tidak boleh kosong' })
  @IsString({ message: 'ISBN harus berupa teks' })
  readonly isbn?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Penerbit tidak boleh kosong' })
  @IsNumber({}, { message: 'Penerbit harus berupa angka' })
  @Type(() => Number)
  readonly publisher?: number;

  @IsOptional()
  @IsBoolean({ message: 'Status ketersediaan harus berupa true atau false' })
  readonly isAvailable?: boolean;
}
