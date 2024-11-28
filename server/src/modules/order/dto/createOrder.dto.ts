import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsInt, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { PaymentCardDto } from '@modules/payment/dto/paymentCard.dto';

export class CreateOrderDto {
  @ApiProperty({
    example: 1,
    description: 'Shipping address ID (zorunlu alan)',
  })
  @IsNumber()
  shippingAddressId: number;

  @ApiProperty({
    example: null,
    description: 'Billing address ID (opsiyonel alan)',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  billingAddressId: number;

  @IsOptional()
  @ApiProperty({
    type: PaymentCardDto,
    description: 'Ödeme bilgileri',
    example: {
      cardHolderName: 'AHMET ENSAR YIRTICI',
      cardNumber: '4444111144441111',
      expiryDate: '12/24',
      cvc: '123',
    },
  })
  paymentCard: PaymentCardDto;
}
