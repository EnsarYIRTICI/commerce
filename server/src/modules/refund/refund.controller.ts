import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { RefundService } from './refund.service';
import { Refund } from './refund.entity';

@Controller('refunds')
export class RefundController {
  constructor(private readonly refundService: RefundService) {}

  // Create a new refund
  @Post()
  async create(@Body() refundData: Partial<Refund>): Promise<Refund> {
    return await this.refundService.create(refundData);
  }

  // Retrieve all refunds
  @Get()
  async findAll(): Promise<Refund[]> {
    return await this.refundService.findAll();
  }

  // Retrieve a specific refund by ID
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Refund> {
    return await this.refundService.findOne(id);
  }

  // Update an existing refund
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() refundData: Partial<Refund>,
  ): Promise<Refund> {
    return await this.refundService.update(id, refundData);
  }

  // Delete a refund by ID
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<{ message: string }> {
    await this.refundService.delete(id);
    return { message: `Refund with ID ${id} has been deleted` };
  }
}
