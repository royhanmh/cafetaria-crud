import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsBoolean,
  Min,
  IsOptional,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMenuDto {
  @ApiProperty({ description: 'The name of the menu item' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The price of the menu item, must be a non-negative number',
    minimum: 0,
  })
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  price: number;

  @ApiPropertyOptional({
    description: 'Indicates if the menu item is recommended',
  })
  @IsOptional()
  @IsBoolean()
  isRecommendation?: boolean;

  @ApiProperty({
    description: 'The ID of the cafe associated with the menu item',
  })
  @IsNotEmpty()
  @IsNumber()
  cafeId: number;
}
