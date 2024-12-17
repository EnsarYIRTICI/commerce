import { ITree } from "./ITree";
import { IUser } from "./IUser";

export interface IProduct {
  id: number;
  name: string;
  slug: string;
  description: string;
  categories: ICategory[];
  skus: IProductVariant[];
  createdAt: string;
}

export interface IProductVariant {
  id: number;
  name: string;
  slug: string;
  sku: string;
  stock: number;
  price: number;
  attributeValues: IProductAttributeValue[];
  images: IProductImage[];
}

export interface IProductReview {
  id: number;
  name: string;
  rating: number;
  comment: string;
  product: IProduct;
  user: IUser;
}

export interface IProductImage {
  id: number;
  name: string;
}

export interface IProductAttribute {
  id: string;
  name: string;
}

export interface IProductAttributeValue {
  id: string;
  value: string;
}

export interface ICategory extends ITree {}
