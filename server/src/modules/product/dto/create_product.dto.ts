import {
  IsString,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsNumber,
  IsInt,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateProductVariantDto } from './create_product_variant.dto';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  @IsArray()
  @IsInt({ each: true })
  categories: number[];

  @ValidateNested({ each: true })
  @Type(() => CreateProductVariantDto)
  variants: CreateProductVariantDto[];
}
