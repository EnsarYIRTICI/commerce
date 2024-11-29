import { Injectable, NotFoundException } from '@nestjs/common';
import { CreditCardPaymentService } from './credit-card-payment.service';
import { BKMExpressPaymentService } from './bkm-express-payment.service';
import { BankTransferPaymentService } from './bank-transfer-payment.service';
import { PaymentService } from './payment.service';

@Injectable()
export class PaymentServiceFactory {
  constructor(
    private readonly creditCardPaymentService: CreditCardPaymentService,
    private readonly bkmExpressPaymentService: BKMExpressPaymentService,
    private readonly bankTransferPaymentService: BankTransferPaymentService,
  ) {}

  getPaymentService(
    paymentMethod: 'CreditCard' | 'BKMExpress' | 'BankTransfer',
  ): PaymentService {
    switch (paymentMethod) {
      case 'CreditCard':
        return this.creditCardPaymentService;
      case 'BKMExpress':
        return this.bkmExpressPaymentService;
      case 'BankTransfer':
        return this.bankTransferPaymentService;
      default:
        throw new NotFoundException(
          `Payment method ${paymentMethod} not supported`,
        );
    }
  }
}
