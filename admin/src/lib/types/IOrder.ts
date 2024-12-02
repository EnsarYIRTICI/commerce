import { IProduct } from "./IProduct";
import { IStatic } from "./IStatic";
import { IUser } from "./IUser";

export interface IOrder {
  id: number;
  orderNumber: string;
  createdAt: Date;
  updatedAt?: Date;
  user: IUser;
  status: IOrderStatus;
  items: IOrderItem[];
  shippingAddress: IAddressDetail;
  billingAddress: IAddressDetail;
  paymentDetails: IPaymentDetail[];
  shipmentDetails: IShipmentDetail[];
}

export interface IOrderStatus extends IStatic {}

export interface IOrderItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  product: IProduct;
}

export interface IAddressDetail {
  id: number;
  name: string;
  country: string;
  region: string;
  city: string;
  postalCode: string;
  addressLine1: string;
  addressLine2?: string;
  shippingOrders?: IOrder[];
  billingOrders?: IOrder[];
}

export interface IShipmentDetail {
  id: number;
  name: string;
  estimatedDelivery: Date;
}

export interface IPaymentDetail {
  id: number;
  paymentType: string;
  cardType: string;
  shippingFee: number;
  totalPrice: number;
}
