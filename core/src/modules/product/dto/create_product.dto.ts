import {
  IsString,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsNumber,
  IsInt,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    description: 'Name of the product',
    example: 'super-t-shirt',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Description of the product',
    example: 'A comfortable cotton T-shirt',
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({
    description: 'List of category IDs the product belongs to',
    example: [1, 2],
  })
  @IsArray()
  @IsInt({ each: true })
  categories: number[];
}
