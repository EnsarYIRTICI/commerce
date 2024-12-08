import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsArray,
  IsInt,
  Min,
  Max,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'deneme2-asdfasdf',
  })
  slug: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'harika!!',
  })
  comment: string;

  @IsInt()
  @Min(1)
  @Max(5)
  @ApiProperty({
    example: 4,
    description: 'Rating must be an integer between 1 and 5 (inclusive)',
  })
  rating: number;
}
