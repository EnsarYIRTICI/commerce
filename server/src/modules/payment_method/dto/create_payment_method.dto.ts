export class CreatePaymentMethodDto {
  name: string;
  description?: string;
}

export class UpdatePaymentMethodDto {
  name?: string;
  description?: string;
}
