import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { UpdateSkuStockDto } from './update-sku-stock.dto';
import { UpdateSkuPriceDto } from './update-sku-price.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSkuDto {
  @ApiProperty({
    description: 'Name of the sku',
    example: 'super-t-shirt-2-ff0000-s',
  })
  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsInt()
  @IsNotEmpty()
  barcode: number;

  @ValidateNested()
  @Type(() => UpdateSkuStockDto)
  stockDetails: UpdateSkuStockDto;

  @ValidateNested()
  @Type(() => UpdateSkuPriceDto)
  priceDetails: UpdateSkuPriceDto;
}
