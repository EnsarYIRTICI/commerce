import { BadRequestException, Injectable } from '@nestjs/common';
import { PaymentRequestData } from 'iyzipay';
import { Payment } from '../payment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItem } from '@modules/shopping_cart/cart_item/cart_item.entity';
import { Address } from '@modules/address/address.entity';
import { PaymentCardDto } from '../dto/paymentCard.dto';
import { User } from '@modules/user/user.entity';
import { IyzicoService } from '../payment-system/iyzico/iyzico.service';
import { PaymentStrategy } from './payment.strategy';

@Injectable()
export class BankTransferPaymentStrategy implements PaymentStrategy {
  async pay(amount: number) {}
}
