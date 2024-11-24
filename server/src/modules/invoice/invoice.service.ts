import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from './invoice.entity';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
  ) {}

  // Create a new invoice
  async create(invoiceData: Partial<Invoice>): Promise<Invoice> {
    const invoice = this.invoiceRepository.create(invoiceData);
    return await this.invoiceRepository.save(invoice);
  }

  // Retrieve all invoices
  async findAll(): Promise<Invoice[]> {
    return await this.invoiceRepository.find({
      relations: ['user', 'subscription'],
    });
  }

  // Retrieve a specific invoice by ID
  async findOne(id: number): Promise<Invoice> {
    return await this.invoiceRepository.findOne({
      where: { id },
      relations: ['user', 'subscription'],
    });
  }

  // Update an existing invoice
  async update(id: number, invoiceData: Partial<Invoice>): Promise<Invoice> {
    const invoice = await this.invoiceRepository.findOne({ where: { id } });
    if (!invoice) {
      throw new Error(`Invoice with ID ${id} not found`);
    }
    Object.assign(invoice, invoiceData);
    return await this.invoiceRepository.save(invoice);
  }

  // Delete an invoice by ID
  async delete(id: number): Promise<void> {
    const result = await this.invoiceRepository.delete(id);
    if (result.affected === 0) {
      throw new Error(`Invoice with ID ${id} not found`);
    }
  }
}
