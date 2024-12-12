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

export class PaymentCardDto {
  @IsString()
  @MinLength(1)
  cardHolderName: string;

  @IsNumberString()
  @Length(16, 16)
  cardNumber: string;

  @IsNumberString()
  @Length(2, 2)
  expireMonth: string;

  @IsNumberString()
  @Length(4, 4)
  expireYear: string;

  @IsNumberString()
  @Length(3, 3)
  cvc: string;

  @IsOptional()
  @IsNumberString()
  registerCard?: number;

  @IsOptional()
  @IsString()
  cardAlias?: string;
}
