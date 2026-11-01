import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateAuthDto {
	@IsEmail({}, { message: 'Email harus valid dan mengandung @' })
	@IsNotEmpty({ message: 'Email harus diisi' })
	@IsString({ message: 'Email harus berupa teks' })
	readonly email: string;

	@IsNotEmpty({ message: 'Password harus diisi' })
	@IsString({ message: 'Password harus berupa teks' })
	@MinLength(3, { message: 'Password minimal 3 karakter' })
	@MaxLength(10, { message: 'Password maksimal 10 karakter' })
	readonly password: string;
}
