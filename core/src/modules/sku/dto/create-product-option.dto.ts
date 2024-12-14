import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsArray,
  IsInt,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductOptionDto {
  @IsInt()
  @IsNotEmpty()
  priority: number;

  @IsInt()
  @IsNotEmpty()
  attributeId: number;

  @ValidateNested({ each: true })
  @Type(() => CreateProductOptionValueDto)
  valueIds: CreateProductOptionValueDto[];
}

export class CreateProductOptionValueDto {
  @IsInt()
  @IsNotEmpty()
  priority: number;

  @IsInt()
  @IsNotEmpty()
  valueId: number;
}
