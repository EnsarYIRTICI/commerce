import { User } from '@modules/user/user.entity';
import { PaymentCardDto } from './dto/paymentCard.dto';
import { Address } from '@modules/address/address.entity';
import { CartItem } from '@modules/shopping_cart/cart_item/cart_item.entity';
import { Payment } from './payment.entity';

export interface PaymentServiceInitData {
  user: User;
  ip: string;
  billingAddress: Address;
  shippingAddress: Address;
  cartItems: CartItem[];
  date: Date;
}

export interface PaymentService {
  init: (paymentServiceInitData: PaymentServiceInitData) => void;

  create(amount: number): Promise<Payment>;
}
