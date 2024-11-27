import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePaymentStatusDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
