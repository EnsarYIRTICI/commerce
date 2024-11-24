import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { Invoice } from './invoice.entity';

@Controller('invoices')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  // Create a new invoice
  @Post()
  async create(@Body() invoiceData: Partial<Invoice>): Promise<Invoice> {
    return await this.invoiceService.create(invoiceData);
  }

  // Retrieve all invoices
  @Get()
  async findAll(): Promise<Invoice[]> {
    return await this.invoiceService.findAll();
  }

  // Retrieve a specific invoice by ID
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Invoice> {
    return await this.invoiceService.findOne(id);
  }

  // Update an existing invoice
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() invoiceData: Partial<Invoice>,
  ): Promise<Invoice> {
    return await this.invoiceService.update(id, invoiceData);
  }

  // Delete an invoice by ID
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<{ message: string }> {
    await this.invoiceService.delete(id);
    return { message: `Invoice with ID ${id} has been deleted` };
  }
}
