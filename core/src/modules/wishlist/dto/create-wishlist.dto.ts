import {
  IsString,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsNumber,
  IsInt,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWishlistDto {
  @ApiProperty({
    example: 'My Favorite List',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
