import { User } from '@modules/user/user.entity';
import { PaymentCardDto } from '../dto/paymentCard.dto';
import { Address } from '@modules/address/address.entity';
import { CartItem } from '@modules/shopping_cart/cart_item/cart_item.entity';
import { Payment } from '../payment.entity';

export interface PaymentResult {
  status: string;
  locale?: string;
  systemTime: number;
  conversationId?: string;
}

export abstract class PaymentSystem {
  abstract test(): Promise<PaymentResult>;
  abstract createCreditCardPayment(paymentRequest: any): Promise<PaymentResult>;
  abstract createBkmPayment(paymentRequest: any): Promise<PaymentResult>;
}
