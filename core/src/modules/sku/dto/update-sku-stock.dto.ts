import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class UpdateSkuStockDto {
  @IsInt()
  @IsNotEmpty()
  stock: number;

  @IsInt()
  @IsNotEmpty()
  warehouseId: number;
}
