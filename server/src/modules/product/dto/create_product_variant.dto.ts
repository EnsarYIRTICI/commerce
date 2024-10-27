import { IsString, IsNumber, IsNotEmpty, IsArray } from 'class-validator';

export class CreateProductVariantDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  sku: string;

  @IsNumber()
  stock: number;

  @IsNumber()
  price: number;

  @IsArray()
  attributeValues: number[];
}
