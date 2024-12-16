import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateSkuImageDto {
  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsString()
  @IsNotEmpty()
  image: string;
}
