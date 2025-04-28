import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Payment')
@Controller('payments')
export class PaymentController {
  constructor() {} // private readonly iyzicoService: IyzicoService

  // @Get('/test/iyzico')
  // async testIyzico() {
  //   return await this.iyzicoService.test();
  // }
}
