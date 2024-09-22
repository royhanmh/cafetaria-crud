import {
  IsNotEmpty,
  IsString,
  Matches,
  Length,
  IsNumber,
} from 'class-validator';

export class CreateCafeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @Matches(/^\+62[0-9]{8,14}$/, {
    message:
      'Phone number must start with +62 and be followed by 8 to 14 digits',
  })
  @Length(10, 18, {
    message: 'Phone number must be between 10 and 18 characters',
  })
  phoneNumber: string;

  @IsNotEmpty()
  @IsNumber()
  ownerId: number;
}
