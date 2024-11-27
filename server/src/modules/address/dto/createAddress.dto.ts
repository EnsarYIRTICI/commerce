import {
  IsNotEmpty,
  IsOptional,
  IsPostalCode,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAddressDto {
  @ApiProperty({
    example: 'Home',
    description: 'Adresin adı (örneğin, "Home", "Work" gibi)',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'Turkey', description: 'Ülke adı' })
  @IsNotEmpty()
  @IsString()
  country: string;

  @ApiProperty({
    example: 'Marmara',
    description: 'Bölge (örneğin, eyalet veya il)',
  })
  @IsNotEmpty()
  @IsString()
  region: string;

  @ApiProperty({ example: 'Istanbul', description: 'Şehir adı' })
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty({ example: '34100', description: 'Geçerli bir posta kodu' })
  @IsNotEmpty()
  @IsPostalCode('any')
  postalCode: string;

  @ApiProperty({
    example: 'Beylikdüzü Mah. No:5',
    description: 'Adresin ilk satırı',
  })
  @IsNotEmpty()
  @IsString()
  addressLine1: string;

  @ApiProperty({
    example: 'Daire 10',
    description: 'Adresin ikinci satırı (opsiyonel)',
    required: false,
  })
  @IsOptional()
  @IsString()
  addressLine2?: string;
}
