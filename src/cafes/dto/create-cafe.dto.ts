import {
  IsNotEmpty,
  IsString,
  Matches,
  Length,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCafeDto {
  @ApiProperty({ description: 'The name of the cafe' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'The address of the cafe' })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({
    description:
      'The phone number of the cafe, must start with +62 and be followed by 8 to 14 digits',
    example: '+62812345678',
  })
  @IsNotEmpty()
  @Matches(/^\+62[0-9]{8,14}$/, {
    message:
      'Phone number must start with +62 and be followed by 8 to 14 digits',
  })
  @Length(10, 18, {
    message: 'Phone number must be between 10 and 18 characters',
  })
  phoneNumber: string;

  @ApiProperty({ description: 'The ID of the owner' })
  @IsNotEmpty()
  @IsNumber()
  ownerId: number;

  @ApiProperty({ description: 'The ID of the manager' })
  @IsNotEmpty()
  @IsNumber()
  managerId: number;
}
