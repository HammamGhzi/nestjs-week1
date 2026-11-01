import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreatePublisherDto {
  @IsNotEmpty({ message: 'Nama penerbit tidak boleh kosong' })
  @IsString()
  @MaxLength(150)
  name: string;
}
