export interface CreateProductDto {
  name?: string;
  description?: string;
  categories?: number[];
  variants?: CreateProductVariantDto[];
}

export interface CreateProductVariantDto {
  filesId?: string;
  name?: string;
  sku?: string;
  stock?: number;
  price?: number;
  attributeValues?: number[];
}
