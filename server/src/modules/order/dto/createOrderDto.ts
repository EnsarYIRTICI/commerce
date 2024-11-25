import {
  IsString,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsNumber,
  IsInt,
  IsBoolean,
  IsOptional,
  MinLength,
  IsNumberString,
  Length,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ProductVariant } from '@modules/product_variant/product_variant.entity';
import { PaymentCardDto } from '@modules/payment/dto/paymentCard.dto';

export class CreateOrderDto {
  @IsNumber()
  shippingAddressId: number;

  @IsOptional()
  @IsNumber()
  billingAddressId: number;

  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  orderItems: CreateOrderItemDto[];

  paymentCard: PaymentCardDto;
}

export class CreateOrderItemDto {
  @IsInt()
  quantity: number;

  @IsInt()
  productVariantId: number;
}
