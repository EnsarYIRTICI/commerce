import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsArray,
} from 'class-validator';

export class ProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  stock: number;
}
