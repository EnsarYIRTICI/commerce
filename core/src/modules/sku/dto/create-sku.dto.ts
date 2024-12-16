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
import { CreateProductOptionDto } from './create-product-option.dto';

export class CreateSkuDto {
  @ApiProperty({
    description: 'Name of the product',
    example: 'super-t-shirt-2',
  })
  @IsString()
  @IsNotEmpty()
  productSlug: string;

  @ApiProperty({
    description: 'List of product options with attributes',
    type: [CreateProductOptionDto],
    example: [
      {
        priority: 1,
        attributeId: 17,
        valueIds: [
          {
            priority: 1,
            valueId: 82,
          },
          {
            priority: 2,
            valueId: 83,
          },
          {
            priority: 3,
            valueId: 84,
          },
        ],
      },
      {
        priority: 2,
        attributeId: 18,
        valueIds: [
          {
            priority: 1,
            valueId: 94,
          },
          {
            priority: 2,
            valueId: 95,
          },
          {
            priority: 3,
            valueId: 96,
          },
        ],
      },
    ],
  })
  @ValidateNested({ each: true })
  @Type(() => CreateProductOptionDto)
  attributes: CreateProductOptionDto[];
}
