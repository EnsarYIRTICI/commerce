import { User } from '@modules/user/user.entity';
import { PaymentCardDto } from '../dto/paymentCard.dto';
import { CartItem } from '@modules/cart_item/entities/cart_item.entity';
import { Payment } from '../payment.entity';
import { PaymentResult } from '../payment-system/payment.system';
import { Address } from '@modules/address/entities/address.entity';

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
