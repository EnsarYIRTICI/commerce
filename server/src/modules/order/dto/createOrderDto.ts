import {
  IsString,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsNumber,
  IsInt,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ProductVariant } from '@modules/product_variant/product_variant.entity';

export class CreateOrderDto {
  @IsNumber()
  shippingAddressId: number;

  @IsOptional()
  @IsNumber()
  billingAddressId: number;

  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  orderItems: CreateOrderItemDto[];
}

export class CreateOrderItemDto {
  @IsInt()
  quantity: number;

  @IsInt()
  productVariantId: number;
}
