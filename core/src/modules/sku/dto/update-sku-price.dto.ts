import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class UpdateSkuPriceDto {
  @IsInt()
  @IsNotEmpty()
  price: number;

  @IsInt()
  @IsNotEmpty()
  currencyId: number;
}
