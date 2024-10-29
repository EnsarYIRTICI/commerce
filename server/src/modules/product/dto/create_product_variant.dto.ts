import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsArray,
  IsInt,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { IsNumberStringOrNumber } from 'src/validators/isNumberStringOrNumber';

export class CreateProductVariantDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  sku: string;

  // @IsNumberStringOrNumber({
  //   message: 'Stock must be a number or numeric string',
  // })
  stock: number;

  // @IsNumberStringOrNumber({
  //   message: 'Price must be a number or numeric string',
  // })
  price: number;

  @IsArray()
  attributeValues: number[];

  images: Express.Multer.File[];
}
