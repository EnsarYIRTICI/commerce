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
import { CreateSkuDto } from '@modules/sku/dto/create-sku.dto';

export class CreateProductDto {
  @ApiProperty({
    description: 'Name of the product',
    example: 'super-t-shirt-2',
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

  @ValidateNested()
  @Type(() => CreateSkuDto)
  options: CreateSkuDto;
}
