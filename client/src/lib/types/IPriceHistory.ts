import { IProduct } from "./IProduct";

export interface IPriceHistory {
  id: number;
  name: string;
  price: number;
  createdAt: Date;
  product: IProduct;
}
