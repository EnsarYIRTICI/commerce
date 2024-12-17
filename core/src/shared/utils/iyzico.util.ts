import Iyzipay from 'iyzipay';
import { Request } from 'express';
import { CreateOrderDto } from '@modules/order/dto/createOrder.dto';
import { User } from '@modules/user/user.entity';
import { PaymentCardDto } from '@modules/payment/dto/paymentCard.dto';
import { CartItem } from '@modules/cart_item/entities/cart_item.entity';
import { Injectable } from '@nestjs/common';
import { IAddress } from '@shared/interface/address';

@Injectable()
export class IyzicoUtil {
  constructor() {}

  getBuyer = (ip: string, user: User, billingAddress: IAddress) => {
    return {
      id: user.id,
      name: user.name,
      surname: user.lastname,
      gsmNumber: '+905554443322',
      email: user.email,
      identityNumber: '12345678910',
      lastLoginDate: this.formatDateToIyzicoFormat(new Date()),
      registrationDate: this.formatDateToIyzicoFormat(user.createdAt),
      registrationAddress:
        billingAddress.addressLine1 + billingAddress.addressLine2,
      city: billingAddress.city,
      country: billingAddress.country,
      zipCode: billingAddress.postalCode,
      ip: ip,
    };
  };

  getBasketItems = (cartItems: CartItem[]) => {
    const basketItems = [];

    for (const item of cartItems) {
      const productVariant = item.productVariant;

      for (let i = 0; i < item.quantity; i++) {
        basketItems.push({
          id: productVariant.id,
          name: productVariant.name,
          category1: productVariant.product.categories?.[0]?.id || 'N/A',
          category2: productVariant.product.categories?.[1]?.id || 'N/A',
          itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
        });
      }
    }

    return basketItems;
  };

  getPaymentCard = (paymentCardDto: PaymentCardDto) => {
    return {
      cardHolderName: paymentCardDto.cardHolderName,
      cardNumber: paymentCardDto.cardNumber,
      expireMonth: paymentCardDto.expireMonth,
      expireYear: paymentCardDto.expireYear,
      cvc: paymentCardDto.cvc,
      registerCard: paymentCardDto.registerCard,
      cardAlias: paymentCardDto.cardAlias,
    };
  };

  getBillingAddress = (billingAddress: IAddress) => {
    return {
      contactName: billingAddress.name,
      city: billingAddress.city,
      country: billingAddress.country,
      address: billingAddress.addressLine1 + billingAddress.addressLine2,
      zipCode: billingAddress.postalCode,
    };
  };

  getShippingAddress = (shippingAddress: IAddress) => {
    return {
      contactName: shippingAddress.name,
      city: shippingAddress.city,
      country: shippingAddress.country,
      address: shippingAddress.addressLine1 + shippingAddress.addressLine2,
      zipCode: shippingAddress.postalCode,
    };
  };

  formatDateToIyzicoFormat = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };
}
