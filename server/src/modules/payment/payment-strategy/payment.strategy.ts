import { User } from '@modules/user/user.entity';
import { PaymentCardDto } from '../dto/paymentCard.dto';
import { Address } from '@modules/address/address.entity';
import { CartItem } from '@modules/shopping_cart/cart_item/cart_item.entity';
import { Payment } from '../payment.entity';

export interface PaymentStrategy {
  pay(
    amount: number,
    {
      user,
      ip,
      billingAddress,
      shippingAddress,
      cartItems,
      date,
    }: {
      user: User;
      ip: string;
      billingAddress: Address;
      shippingAddress: Address;
      cartItems: CartItem[];
      date: Date;
    },
  ): Promise<any>;
}
