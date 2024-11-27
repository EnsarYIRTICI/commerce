
import { PartialType } from '@nestjs/mapped-types';
import { CreateRefundStatusDto } from './create-refund-status.dto';

export class UpdateRefundStatusDto extends PartialType(CreateRefundStatusDto) {}
