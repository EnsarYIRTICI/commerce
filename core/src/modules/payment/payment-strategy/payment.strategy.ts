import { User } from '@modules/user/user.entity';
import { PaymentCardDto } from '../dto/paymentCard.dto';
import { Address } from '@modules/address/address.entity';
import { CartItem } from '@modules/cart_item/cart_item.entity';
import { Payment } from '../payment.entity';
import { PaymentResult } from '../payment-system/payment.system';

export interface PayData {
  user: User;
  ip: string;
  billingAddress: Address;
  shippingAddress: Address;
  cartItems: CartItem[];
  date: Date;
}

export interface PaymentStrategy {
  pay(amount: number, payData: PayData): Promise<PaymentResult>;
}
