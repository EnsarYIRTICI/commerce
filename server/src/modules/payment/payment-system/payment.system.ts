import { User } from '@modules/user/user.entity';
import { PaymentCardDto } from '../dto/paymentCard.dto';
import { Address } from '@modules/address/address.entity';
import { CartItem } from '@modules/shopping_cart/cart_item/cart_item.entity';
import { Payment } from '../payment.entity';

export interface PaymentSystem {
  test(): Promise<any>;
  createCreditCardPayment(paymentRequest: any): Promise<any>;
  createBkmPayment(paymentRequest: any): Promise<any>;
}
