import Iyzipay from 'iyzipay';
import { Request } from 'express';
import { CreateOrderDto } from '@modules/order/dto/createOrder.dto';
import { v4 as uuidv4 } from 'uuid';
import { User } from '@modules/user/user.entity';
import { Address } from '@modules/address/address.entity';
import { ProductVariant } from '@modules/product/product_variant/product_variant.entity';
import { PaymentCardDto } from '@modules/payment/dto/paymentCard.dto';

const getBasketItem = (productVariant: ProductVariant) => {
  return {
    id: productVariant.id,
    name: productVariant.name,
    category1: productVariant.product.categories[0],
    category2: productVariant.product.categories[1],
    itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
    price: productVariant.price,
  };
};

const getOrderPaymentRequest = (
  user: User,
  ip: string,
  paymentCardDto: PaymentCardDto,
  billingAddress: Address,
  shippingAddress: Address,
  price: number,
  basketItems,
) => {
  const basketId = uuidv4();
  const conversationId = `${user.id}-${Date.now()}`;

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
      cardHolderName: paymentCardDto.cardHolderName,
      cardNumber: paymentCardDto.cardNumber,
      expireMonth: paymentCardDto.expireMonth,
      expireYear: paymentCardDto.expireYear,
      cvc: paymentCardDto.cvc,
      registerCard: paymentCardDto.registerCard,
      cardAlias: paymentCardDto.cardAlias,
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

export { getBasketItem, getOrderPaymentRequest };
