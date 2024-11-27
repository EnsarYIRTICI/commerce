
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { RefundStatusService } from './refund-status.service';
import { CreateRefundStatusDto } from './dto/create-refund-status.dto';
import { UpdateRefundStatusDto } from './dto/update-refund-status.dto';

@Controller('refund-status')
export class RefundStatusController {
  constructor(private readonly refundStatusService: RefundStatusService) {}

  @Post()
  create(@Body() createRefundStatusDto: CreateRefundStatusDto) {
    return this.refundStatusService.create(createRefundStatusDto);
  }

  @Get()
  findAll() {
    return this.refundStatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.refundStatusService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRefundStatusDto: UpdateRefundStatusDto,
  ) {
    return this.refundStatusService.update(id, updateRefundStatusDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.refundStatusService.remove(id);
  }
}
