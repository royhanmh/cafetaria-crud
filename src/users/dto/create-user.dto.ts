import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../user-role.enum';

export class CreateUserDto {
  @ApiProperty({ description: 'The username of the user' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ description: 'The full name of the user' })
  @IsNotEmpty()
  @IsString()
  fullname: string;

  @ApiProperty({ description: 'The password of the user' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    description: 'The role of the user',
    enum: UserRole,
    required: false,
  })
  @IsEnum(UserRole)
  role?: UserRole;
}
