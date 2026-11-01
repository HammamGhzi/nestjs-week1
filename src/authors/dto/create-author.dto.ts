import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateAuthorDto {
  @IsNotEmpty({ message: 'Nama penulis tidak boleh kosong' })
  @IsString()
  @MaxLength(150)
  name: string;
}
