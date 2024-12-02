import { IProduct } from "./IProduct";
import { IUser } from "./IUser";

export interface IWishlist {
  id: number;
  name: string;
  title: string;
  user: IUser;
  items: IWishlistItem[];
}

export interface IWishlistItem {
  id: number;
  name: string;
  quantity: number;
  product: IProduct;
}
