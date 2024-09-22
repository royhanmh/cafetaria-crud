import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../user-role.enum';

export class UpdateUserDto {
  @ApiProperty({ description: 'The username of the user', required: false })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiProperty({ description: 'The full name of the user', required: false })
  @IsOptional()
  @IsString()
  fullname?: string;

  @ApiProperty({ description: 'The password of the user', required: false })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiProperty({
    description: 'The role of the user',
    enum: UserRole,
    required: false,
  })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
