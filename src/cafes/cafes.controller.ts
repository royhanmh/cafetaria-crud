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
import { Cafe } from './entities/cafe.entity';
import { CafesService } from './cafes.service';
import { CreateCafeDto } from './dto/create-cafe.dto';
import { UpdateCafeDto } from './dto/update-cafe.dto';
import { createJsonResponse, JsonResponse } from 'src/CreateJsonResponse.util';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/role.decorator';
import { UserRole } from 'src/users/user-role.enum';

@Controller('cafes')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CafesController {
  constructor(private readonly cafesService: CafesService) {}

  @Post()
  @Roles(UserRole.owner, UserRole.superadmin)
  @HttpCode(HttpStatus.CREATED)
  async createCafe(
    @Body() createCafeDto: CreateCafeDto,
  ): Promise<JsonResponse<Cafe>> {
    const cafe = await this.cafesService.createCafe(createCafeDto);
    return createJsonResponse(
      true,
      'Cafe created successfully',
      HttpStatus.CREATED,
      cafe,
    );
  }

  @Get()
  @Roles(UserRole.owner, UserRole.superadmin)
  @HttpCode(HttpStatus.OK)
  async getCafes(): Promise<JsonResponse<Cafe[]>> {
    const cafes = await this.cafesService.getCafes();
    return createJsonResponse(
      true,
      'Cafes retrieved successfully',
      HttpStatus.OK,
      cafes,
    );
  }

  @Get(':id')
  @Roles(UserRole.owner, UserRole.superadmin)
  @HttpCode(HttpStatus.OK)
  async getCafeById(@Param('id') id: number): Promise<JsonResponse<Cafe>> {
    const cafe = await this.cafesService.getCafeById(id);
    if (cafe) {
      return createJsonResponse(
        true,
        'Cafe retrieved successfully',
        HttpStatus.OK,
        cafe,
      );
    } else {
      throw new NotFoundException(
        createJsonResponse(false, 'Cafe not found', HttpStatus.NOT_FOUND),
      );
    }
  }

  @Put(':id')
  @Roles(UserRole.owner, UserRole.superadmin)
  @HttpCode(HttpStatus.OK)
  async updateCafe(
    @Param('id') id: number,
    @Body() updateCafeDto: UpdateCafeDto,
  ): Promise<JsonResponse<Cafe>> {
    const updatedCafe = await this.cafesService.updateCafe(id, updateCafeDto);
    return createJsonResponse(
      true,
      'Cafe updated successfully',
      HttpStatus.OK,
      updatedCafe,
    );
  }

  @Delete(':id')
  @Roles(UserRole.superadmin)
  @HttpCode(HttpStatus.OK)
  async deleteCafe(@Param('id') id: number): Promise<JsonResponse<void>> {
    const cafe = await this.cafesService.getCafeById(id);

    if (!cafe) {
      return createJsonResponse(false, 'Cafe not found', HttpStatus.NOT_FOUND);
    }

    await this.cafesService.deleteCafe(id);
    return createJsonResponse(true, 'Cafe deleted successfully', HttpStatus.OK);
  }
}
