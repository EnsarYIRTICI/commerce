import { User } from '@modules/user/user.entity';
import { PaymentCardDto } from '../dto/paymentCard.dto';
import { CartItem } from '@modules/basket/entities/cart_item.entity';
import { Payment } from '../payment.entity';
import { PayData } from '../payment-strategy/payment.strategy';

export interface PaymentResult {
  status: string;
  locale?: string;
  systemTime: number;
  conversationId?: string;
}

export abstract class PaymentSystem {
  abstract test(): Promise<PaymentResult>;
  abstract createCreditCardPayment(
    payData: PayData,
    paymentCard: PaymentCardDto,
    amount: number,
  ): Promise<PaymentResult>;
  abstract createBkmPayment(
    payData: PayData,
    amount: number,
  ): Promise<PaymentResult>;
}
