import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginAuthDto {
	@IsEmail({}, { message: 'Email harus valid dan mengandung @' })
	@IsNotEmpty({ message: 'Email harus diisi' })
	@IsString({ message: 'Email harus berupa teks' })
	readonly email: string;

	@IsNotEmpty({ message: 'Password harus diisi' })
	@IsString({ message: 'Password harus berupa teks' })
	readonly password: string;
}
