import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { createJsonResponse, JsonResponse } from 'src/CreateJsonResponse.util';
import { UserRole } from './user-role.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED) // HTTP 201 for creation
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<JsonResponse<User>> {
    const user = await this.userService.createUser(createUserDto);
    return createJsonResponse(
      true,
      'User created successfully',
      HttpStatus.CREATED,
      user,
    );
  }

  @Get()
  @HttpCode(HttpStatus.OK) // HTTP 200 for success
  async getUsers(): Promise<JsonResponse<User[]>> {
    const users = await this.userService.getUsers();
    return createJsonResponse(
      true,
      'Users retrieved successfully',
      HttpStatus.OK,
      users,
    );
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK) // HTTP 200 for success
  async getUserById(@Param('id') id: number): Promise<JsonResponse<User>> {
    const user = await this.userService.getUserById(id);
    if (user) {
      return createJsonResponse(
        true,
        'User retrieved successfully',
        HttpStatus.OK,
        user,
      );
    } else {
      throw new NotFoundException(
        createJsonResponse(false, 'User not found', HttpStatus.NOT_FOUND),
      );
    }
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK) // HTTP 200 for success
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<JsonResponse<User>> {
    const updatedUser = await this.userService.updateUser(id, updateUserDto);
    return createJsonResponse(
      true,
      'User updated successfully',
      HttpStatus.OK,
      updatedUser,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK) // Return 200 for successful operation
  async deleteUser(@Param('id') id: number): Promise<JsonResponse<void>> {
    const user = await this.userService.getUserById(id);

    if (!user) {
      return createJsonResponse(false, 'User not found', HttpStatus.NOT_FOUND);
    }

    await this.userService.deleteUser(id);
    return createJsonResponse(true, 'User deleted successfully', HttpStatus.OK);
  }
}
