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
import { MenusService } from './menus.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { createJsonResponse, JsonResponse } from 'src/CreateJsonResponse.util';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/role.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { UserRole } from 'src/users/user-role.enum';

@Controller('menus')
@UseGuards(JwtAuthGuard)
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED) // HTTP 201 for creation
  async create(
    @Body() createMenuDto: CreateMenuDto,
  ): Promise<JsonResponse<any>> {
    const menu = await this.menusService.create(createMenuDto);
    return createJsonResponse(
      true,
      'Menu created successfully',
      HttpStatus.CREATED,
      menu,
    );
  }

  @Get()
  @HttpCode(HttpStatus.OK) // HTTP 200 for success
  async findAll(): Promise<JsonResponse<any[]>> {
    const menus = await this.menusService.findAll();
    return createJsonResponse(
      true,
      'Menus retrieved successfully',
      HttpStatus.OK,
      menus,
    );
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK) // HTTP 200 for success
  async findOne(@Param('id') id: number): Promise<JsonResponse<any>> {
    const menu = await this.menusService.findOne(id);
    if (menu) {
      return createJsonResponse(
        true,
        'Menu retrieved successfully',
        HttpStatus.OK,
        menu,
      );
    } else {
      throw new NotFoundException(
        createJsonResponse(false, 'Menu not found', HttpStatus.NOT_FOUND),
      );
    }
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK) // HTTP 200 for success
  async update(
    @Param('id') id: number,
    @Body() updateMenuDto: UpdateMenuDto,
  ): Promise<JsonResponse<any>> {
    const updatedMenu = await this.menusService.update(id, updateMenuDto);
    return createJsonResponse(
      true,
      'Menu updated successfully',
      HttpStatus.OK,
      updatedMenu,
    );
  }

  @Delete(':id')
  @Roles(UserRole.superadmin)
  @HttpCode(HttpStatus.OK) // Return 200 for successful operation
  async remove(@Param('id') id: number): Promise<JsonResponse<void>> {
    const menu = await this.menusService.findOne(id);

    if (!menu) {
      return createJsonResponse(false, 'Menu not found', HttpStatus.NOT_FOUND);
    }

    await this.menusService.remove(id);
    return createJsonResponse(true, 'Menu deleted successfully', HttpStatus.OK);
  }
}
