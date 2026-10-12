import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty({ message: 'Judul harus diisi' })
  @IsString({ message: 'Title must be a string' })
  readonly title: string;

  @IsNotEmpty({ message: 'Author is required' })
  @IsString({ message: 'Author must be a string' })
  readonly author: string;

  @IsNotEmpty({ message: 'ISBN is required' })
  @IsString({ message: 'ISBN must be a string' })
  readonly isbn: string;

  @IsNotEmpty({ message: 'Publisher is required' })
  @IsString({ message: 'Publisher must be a string' })
  readonly publisher: string;

  @IsOptional()
  @IsBoolean({ message: 'Availability must be a boolean' })
  readonly isAvailable?: boolean;
}
