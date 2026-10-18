import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
  @IsString({ message: 'Penerbit harus berupa teks' })
  readonly publisher?: string;

  @IsOptional()
  @IsBoolean({ message: 'Status ketersediaan harus berupa true atau false' })
  readonly isAvailable?: boolean;
}
