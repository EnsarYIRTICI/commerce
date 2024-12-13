import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsArray,
  IsInt,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CreateSkuDto {
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ValidateNested({ each: true })
  @Type(() => CreateProductOptionDto)
  attributes: CreateProductOptionDto[];
}

export class CreateProductOptionDto {
  @IsInt()
  @IsNotEmpty()
  priority: number;

  @IsString()
  @IsNotEmpty()
  attributeId: number;

  @IsArray()
  @IsString({ each: true })
  valueIds: number[];
}
