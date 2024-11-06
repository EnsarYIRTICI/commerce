import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsArray,
  IsInt,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CreateProductVariantDto {
  @IsString()
  @IsNotEmpty()
  filesId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  sku: string;

  @IsInt()
  stock: number;

  @IsInt()
  price: number;

  @IsArray()
  @IsInt({ each: true })
  attributeValues: number[];

  @IsArray()
  @IsString({ each: true })
  images: string[];
}
