import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsArray,
  IsInt,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWarehouseDto {
  @IsString()
  @IsNotEmpty()
  nane: number;

  @IsInt()
  @IsNotEmpty()
  priority: number;
}
