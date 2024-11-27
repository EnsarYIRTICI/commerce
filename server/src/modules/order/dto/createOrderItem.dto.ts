import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsInt,
  ValidateNested,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PaymentCardDto } from '@modules/payment/dto/paymentCard.dto';

export class CreateOrderItemDto {
  @ApiProperty({
    description: 'Sipariş edilecek ürün miktarı',
    example: 2,
  })
  @IsInt()
  @Min(1, { message: "Quantity 0'dan büyük olmalıdır." })
  quantity: number;

  @ApiProperty({
    description: "Sipariş edilen ürünün varyant ID'si",
    example: 38,
  })
  @IsInt()
  productVariantId: number;
}
