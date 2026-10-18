import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
  @IsString({ message: 'Penerbit harus berupa teks' })
  readonly publisher: string;

  @IsOptional()
  @IsBoolean({ message: 'Status ketersediaan harus berupa true atau false' })
  readonly isAvailable?: boolean;
}
