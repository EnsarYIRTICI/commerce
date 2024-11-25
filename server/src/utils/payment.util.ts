import Iyzipay from 'iyzipay';
import { Request } from 'express';
import { CreateOrderDto } from '@modules/order/dto/createOrderDto';
import { v4 as uuidv4 } from 'uuid';
import { User } from '@modules/user/user.entity';
import { Address } from '@modules/address/address.entity';

const getOrderPaymentRequest = (
  request: Request,
  user: User,
  createOrderDto: CreateOrderDto,
  billingAddress: Address,
  shippingAddress: Address,
  price: number,
  basketItems,
) => {
  const basketId = uuidv4();
  const conversationId = `${user.id}-${Date.now()}`;
  const ip = request.ip;

  return {
    locale: Iyzipay.LOCALE.TR,
    conversationId: conversationId,
    price: price,
    paidPrice: price,
    currency: Iyzipay.CURRENCY.TRY,
    installments: 1,
    basketId: basketId,
    paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
    paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
    paymentCard: {
      cardHolderName: createOrderDto.paymentCard.cardHolderName,
      cardNumber: createOrderDto.paymentCard.cardNumber,
      expireMonth: createOrderDto.paymentCard.expireMonth,
      expireYear: createOrderDto.paymentCard.expireYear,
      cvc: createOrderDto.paymentCard.cvc,
      registerCard: createOrderDto.paymentCard.registerCard,
      cardAlias: createOrderDto.paymentCard.cardAlias,
    },
    buyer: {
      id: user.iyzipayId,
      name: user.name,
      surname: user.lastname,
      gsmNumber: user.phoneNumber,
      email: user.email,
      identityNumber: user.identityNumber,
      lastLoginDate: user.lastLogin.toDateString(),
      registrationDate: user.createdAt.toDateString(),
      registrationAddress:
        billingAddress.addressLine1 + billingAddress.addressLine2,
      city: billingAddress.city,
      country: billingAddress.country,
      zipCode: billingAddress.postalCode,
      ip: ip,
    },
    shippingAddress: {
      contactName: shippingAddress.name,
      city: shippingAddress.city,
      country: shippingAddress.country,
      address: shippingAddress.addressLine1 + shippingAddress.addressLine2,
      zipCode: shippingAddress.postalCode,
    },
    billingAddress: {
      contactName: billingAddress.name,
      city: billingAddress.city,
      country: billingAddress.country,
      address: billingAddress.addressLine1 + billingAddress.addressLine2,
      zipCode: billingAddress.postalCode,
    },
    basketItems: basketItems,
  };
};

export { getOrderPaymentRequest };
