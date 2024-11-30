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

export class CreateWishlistItemDto {
  @ApiProperty({
    example: '78bcf809-9cad-4901-829d-bb441e987f68',
  })
  @IsString()
  @IsNotEmpty()
  wishlistId: string;

  @ApiProperty({
    example: 'deneme2-asdfasdf',
  })
  @IsString()
  @IsNotEmpty()
  slug: string;
}
