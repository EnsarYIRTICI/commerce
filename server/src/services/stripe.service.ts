import { Injectable, OnModuleInit } from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import { User } from '@modules/user/user.entity';

@Injectable()
export class StripeService implements OnModuleInit {
  private stripe: Stripe;

  constructor(private configService: ConfigService) {
    this.stripe = new Stripe(
      this.configService.get<string>('STRIPE_SECRET_KEY'),
      {},
    );
  }

  onModuleInit() {}

  async createCustomer(user: User) {
    return await this.stripe.customers.create({
      email: user.email,
      name: user.name,
    });
  }

  async createPaymentIntent(user: User, amount: number, currency: string) {
    if (!user.stripeCustomerId) {
      throw new Error('Stripe müşteri ID bulunamadı');
    }

    return this.stripe.paymentIntents.create({
      amount,
      currency,
      customer: user.stripeCustomerId,
    });
  }
}
