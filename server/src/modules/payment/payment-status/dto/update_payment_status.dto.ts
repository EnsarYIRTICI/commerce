import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentStatusDto } from './create_payment_status.dto';

export class UpdatePaymentStatusDto extends PartialType(
  CreatePaymentStatusDto,
) {}
