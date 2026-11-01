import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdatePublisherDto {
  @IsOptional()
  @IsString()
  @MaxLength(150)
  name?: string;
}
