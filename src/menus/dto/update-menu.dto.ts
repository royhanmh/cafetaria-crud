import {
  IsString,
  IsNumber,
  IsBoolean,
  Min,
  IsOptional,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateMenuDto {
  @ApiPropertyOptional({ description: 'The name of the menu item' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'The price of the menu item, must be a non-negative number',
    minimum: 0,
  })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  price?: number;

  @ApiPropertyOptional({
    description: 'Indicates if the menu item is recommended',
  })
  @IsOptional()
  @IsBoolean()
  isRecommendation?: boolean;

  @ApiPropertyOptional({
    description: 'The ID of the cafe associated with the menu item',
  })
  @IsOptional()
  @IsNumber()
  cafeId?: number;
}
