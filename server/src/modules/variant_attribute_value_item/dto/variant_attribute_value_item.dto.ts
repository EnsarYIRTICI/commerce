import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { ProductVariant } from '@modules/product_variant/product_variant.entity';
import { AttributeValue } from '@modules/attribute_value/attribute_value.entity';
import { Product } from '@modules/product/product.entity';

export class VariantAttributeValueItemDto {
  id: number;
}
