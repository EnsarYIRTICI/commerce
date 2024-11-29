import Iyzipay from 'iyzipay';
import { Request } from 'express';
import { CreateOrderDto } from '@modules/order/dto/createOrder.dto';
import { v4 as uuidv4 } from 'uuid';
import { User } from '@modules/user/user.entity';
import { Address } from '@modules/address/address.entity';
import { ProductVariant } from '@modules/product/product_variant/product_variant.entity';
import { PaymentCardDto } from '@modules/payment/dto/paymentCard.dto';
import { CartItem } from '@modules/shopping_cart/cart_item/cart_item.entity';
import { PaymentServiceInitData } from '@modules/payment/payment.service';

const getPaymentRequest = (
  paymentServiceInitData: PaymentServiceInitData,
  amount: number,
) => {
  const ip = paymentServiceInitData.ip;
  const user = paymentServiceInitData.user;
  const billingAddress = paymentServiceInitData.billingAddress;
  const shippingAddress = paymentServiceInitData.shippingAddress;

  const cartItems = paymentServiceInitData.cartItems;

  const basketId = uuidv4();
  const conversationId = `${user.id}-${Date.now()}`;

  return {
    locale: Iyzipay.LOCALE.TR,
    conversationId: conversationId,
    price: amount,
    paidPrice: amount,
    currency: Iyzipay.CURRENCY.TRY,
    installments: 1,
    basketId: basketId,
    paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
    paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,

    buyer: getBuyer(ip, user, billingAddress),
    shippingAddress: getShippingAddress(shippingAddress),
    billingAddress: getBillingAddress(billingAddress),
    basketItems: getBasketItems(cartItems),
  };
};

const getBuyer = (ip: string, user: User, billingAddress: Address) => {
  return {
    id: user.id,
    name: user.name,
    surname: user.lastname,
    gsmNumber: '+905554443322',
    email: user.email,
    identityNumber: '12345678910',
    lastLoginDate: formatDateToIyzicoFormat(new Date()),
    registrationDate: formatDateToIyzicoFormat(user.createdAt),
    registrationAddress:
      billingAddress.addressLine1 + billingAddress.addressLine2,
    city: billingAddress.city,
    country: billingAddress.country,
    zipCode: billingAddress.postalCode,
    ip: ip,
  };
};

const getBasketItems = (cartItems: CartItem[]) => {
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
        price: productVariant.price,
      });
    }
  }

  return basketItems;
};

const getPaymentCard = (paymentCardDto: PaymentCardDto) => {
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

const getBillingAddress = (billingAddress: Address) => {
  return {
    contactName: billingAddress.name,
    city: billingAddress.city,
    country: billingAddress.country,
    address: billingAddress.addressLine1 + billingAddress.addressLine2,
    zipCode: billingAddress.postalCode,
  };
};

const getShippingAddress = (shippingAddress: Address) => {
  return {
    contactName: shippingAddress.name,
    city: shippingAddress.city,
    country: shippingAddress.country,
    address: shippingAddress.addressLine1 + shippingAddress.addressLine2,
    zipCode: shippingAddress.postalCode,
  };
};

const formatDateToIyzicoFormat = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export {
  getPaymentRequest,
  getBasketItems,
  getPaymentCard,
  getBillingAddress,
  getShippingAddress,
  formatDateToIyzicoFormat,
};
