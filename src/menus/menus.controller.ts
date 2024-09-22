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
  Request,
} from '@nestjs/common';
import { MenusService } from './menus.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { createJsonResponse, JsonResponse } from 'src/CreateJsonResponse.util';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/role.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { UserRole } from 'src/users/user-role.enum';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('menus')
@ApiBearerAuth()
@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.manager, UserRole.superadmin)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new menu' })
  @ApiResponse({
    status: 201,
    description: 'Menu created successfully',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  async create(
    @Body() createMenuDto: CreateMenuDto,
    @Request() req,
  ): Promise<JsonResponse<any>> {
    const userId = req.user.id;
    const userRole = req.user.role;
    const menu = await this.menusService.create(
      createMenuDto,
      userId,
      userRole,
    );
    return createJsonResponse(
      true,
      'Menu created successfully',
      HttpStatus.CREATED,
      menu,
    );
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Retrieve all menus' })
  @ApiResponse({
    status: 200,
    description: 'Menus retrieved successfully',
  })
  async findAll(): Promise<JsonResponse<any[]>> {
    const menus = await this.menusService.findAll();
    return createJsonResponse(
      true,
      'Menus retrieved successfully',
      HttpStatus.OK,
      menus,
    );
  }

  @Get('recommended')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get recommended menus' })
  @ApiResponse({
    status: 200,
    description: 'Recommended menus retrieved successfully',
  })
  async getRecommendedMenus(): Promise<JsonResponse<any[]>> {
    const recommendedMenus = await this.menusService.findRecommendedMenus();
    return createJsonResponse(
      true,
      'Recommended menus retrieved successfully',
      HttpStatus.OK,
      recommendedMenus,
    );
  }

  @Get('cafe/:id')
  @ApiOperation({ summary: 'Get menus by cafe ID' })
  @ApiResponse({
    status: 200,
    description: 'Menus retrieved successfully',
  })
  async getMenusByCafe(
    @Param('id') cafeId: number,
  ): Promise<JsonResponse<any[]>> {
    const menus = await this.menusService.findMenusByCafe(cafeId);
    return createJsonResponse(
      true,
      'Menus retrieved successfully',
      HttpStatus.OK,
      menus,
    );
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Retrieve a menu by ID' })
  @ApiResponse({
    status: 200,
    description: 'Menu retrieved successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Menu not found',
  })
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.manager, UserRole.superadmin)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update a menu by ID' })
  @ApiResponse({
    status: 200,
    description: 'Menu updated successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Menu not found',
  })
  async update(
    @Param('id') id: number,
    @Body() updateMenuDto: UpdateMenuDto,
    @Request() req,
  ): Promise<JsonResponse<any>> {
    const userId = req.user.id;
    const userRole = req.user.role;
    const updatedMenu = await this.menusService.update(
      id,
      updateMenuDto,
      userId,
      userRole,
    );
    return createJsonResponse(
      true,
      'Menu updated successfully',
      HttpStatus.OK,
      updatedMenu,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.manager, UserRole.superadmin)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a menu by ID' })
  @ApiResponse({
    status: 200,
    description: 'Menu deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Menu not found',
  })
  async remove(
    @Param('id') id: number,
    @Request() req,
  ): Promise<JsonResponse<void>> {
    const userId = req.user.id;
    const userRole = req.user.role;
    const menu = await this.menusService.findOne(id);

    if (!menu) {
      return createJsonResponse(false, 'Menu not found', HttpStatus.NOT_FOUND);
    }

    await this.menusService.remove(id, userId, userRole);
    return createJsonResponse(true, 'Menu deleted successfully', HttpStatus.OK);
  }
}
