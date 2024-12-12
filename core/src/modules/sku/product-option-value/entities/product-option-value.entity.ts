import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ProductOption } from '../../product-option/entities/product-option.entity';
import { AttributeValue } from '@modules/attribute/entities/attribute-value.entity';

@Entity()
export class ProductOptionValue {
  // Fields for the entity

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  priority: number;

  // Relationships for the entity

  @ManyToOne(() => AttributeValue, (entity) => entity.optionValue)
  value: AttributeValue;

  @ManyToOne(() => ProductOption, (option) => option.values, {
    onDelete: 'CASCADE',
  })
  option: ProductOption;
}
