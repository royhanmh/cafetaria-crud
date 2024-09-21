import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserRole } from '../user-role.enum'; // Adjust the import path as necessary

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  fullname: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsEnum(UserRole)
  role?: UserRole; // Optional, defaults to UserRole.manager
}
