import { PartialType } from '@nestjs/mapped-types';
import { CreateCafeDto } from './create-cafe.dto';
import { IsOptional } from 'class-validator';

export class UpdateCafeDto extends PartialType(CreateCafeDto) {
  @IsOptional()
  name?: string;

  @IsOptional()
  address?: string;

  @IsOptional()
  phoneNumber?: string;
}
