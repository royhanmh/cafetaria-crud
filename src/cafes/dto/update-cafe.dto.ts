import { PartialType } from '@nestjs/mapped-types';
import { CreateCafeDto } from './create-cafe.dto';
import { IsOptional, IsString, IsPhoneNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCafeDto extends PartialType(CreateCafeDto) {
  @ApiProperty({ required: false, description: 'The name of the cafe' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false, description: 'The address of the cafe' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ required: false, description: 'The phone number of the cafe' })
  @IsOptional()
  @IsPhoneNumber()
  phoneNumber?: string;

  @ApiProperty({ required: false, description: 'The ID of the owner' })
  @IsOptional()
  ownerId?: number;

  @ApiProperty({ required: false, description: 'The ID of the manager' })
  @IsOptional()
  managerId?: number;
}
