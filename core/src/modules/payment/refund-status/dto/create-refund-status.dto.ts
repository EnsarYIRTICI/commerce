
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRefundStatusDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
