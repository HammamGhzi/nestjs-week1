import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MinLength } from 'class-validator';

export class UpdateMemberDto {
  @IsOptional()
  @IsNotEmpty({ message: 'Nama lengkap tidak boleh kosong' })
  @IsString({ message: 'Nama harus berupa teks' })
  readonly name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Format email tidak valid' })
  readonly email?: string;

  @IsOptional()
  @Matches(/^\d{10,15}$/, { message: 'Nomor telepon harus berupa 10-15 digit angka' })
  readonly phone?: string;

  @IsOptional()
  @MinLength(8, { message: 'Kata sandi minimal 8 karakter' })
  readonly password?: string;
}
