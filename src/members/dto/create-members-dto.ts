import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class CreateMemberDto {
  @IsNotEmpty({ message: 'Nama lengkap wajib diisi' })
  @IsString({ message: 'Nama harus berupa teks' })
  readonly name: string;

  @IsEmail({}, { message: 'Format email tidak valid' })
  readonly email: string;

  @Matches(/^\d{10,15}$/, { message: 'Nomor telepon harus berupa 10-15 digit angka' })
  readonly phone: string;

  @MinLength(8, { message: 'Kata sandi minimal 8 karakter' })
  readonly password: string;
}
