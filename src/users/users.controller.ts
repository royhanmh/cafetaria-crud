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
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { createJsonResponse, JsonResponse } from 'src/CreateJsonResponse.util';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/role.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { UserRole } from './user-role.enum';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  @Roles(UserRole.superadmin)
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: 201, description: 'User created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
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
  @Roles(UserRole.superadmin)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: 'Users retrieved successfully.' })
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
  @Roles(UserRole.superadmin)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: 'User retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
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
  @Roles(UserRole.superadmin)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: 'User updated successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
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
  @Roles(UserRole.superadmin)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: 'User deleted successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async deleteUser(@Param('id') id: number): Promise<JsonResponse<void>> {
    const user = await this.userService.getUserById(id);

    if (!user) {
      return createJsonResponse(false, 'User not found', HttpStatus.NOT_FOUND);
    }

    await this.userService.deleteUser(id);
    return createJsonResponse(true, 'User deleted successfully', HttpStatus.OK);
  }
}
