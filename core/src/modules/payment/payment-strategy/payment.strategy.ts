import { User } from '@modules/user/user.entity';
import { PaymentCardDto } from '../dto/paymentCard.dto';
import { CartItem } from '@modules/basket/entities/cart_item.entity';
import { Payment } from '../payment.entity';
import { PaymentResult } from '@modules/infrastructure/payment/payment.system';
import { IAddress } from '@shared/interface/address';

export interface PayData {
  user: User;
  ip: string;
  billingAddress: IAddress;
  shippingAddress: IAddress;
  cartItems: CartItem[];
  date: Date;
}

export interface PaymentStrategy {
  pay(amount: number, payData: PayData): Promise<PaymentResult>;
}
