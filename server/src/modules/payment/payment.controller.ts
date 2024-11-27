import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Payment } from './payment.entity';
import { IyzicoService } from './iyzico.service';
import { ApiTestRequestData } from 'iyzipay';
import { Roles } from '@decorators/role.decorator';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { IyzicoTestDto } from './dto/iyzicoTest.dto';

@ApiBearerAuth()
@ApiTags('Payment')
@Controller('payments')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly iyzicoService: IyzicoService,
  ) {}

  @Post('/test/iyzico')
  @ApiBody({ type: IyzicoTestDto })
  async testIyzico(@Body() iyzicoTestDto: IyzicoTestDto) {
    return await this.iyzicoService.test();
  }

  @Get()
  findAll() {
    return this.paymentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.paymentService.findOne(id);
  }

  @Post()
  create(@Body() payment: Payment) {
    return this.paymentService.create(payment);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payment: Payment) {
    return this.paymentService.update(id, payment);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.paymentService.delete(id);
  }
}
