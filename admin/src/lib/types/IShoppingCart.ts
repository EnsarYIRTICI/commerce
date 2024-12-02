import { IUser } from "./IUser";

export interface IShoppingCart {
  id: number;
  name: string;
  createdAt: Date;
  items: ICartItem[];
  user: IUser;
}

export interface ICartItem {
  id: number;
  name: string;
  quantity: number;
}
