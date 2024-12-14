import { AttributeValue } from '@modules/attribute/entities/attribute-value.entity';
import { Attribute } from '@modules/attribute/entities/attribute.entity';

export interface AttributeFO extends Attribute {
  priority: number;
  attributeValueFOVs: AttributeValueFOV[];
}

export interface AttributeValueFOV extends AttributeValue {
  priority: number;
}
