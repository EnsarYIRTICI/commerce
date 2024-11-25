import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { Subscription } from './subscription.entity';

@Controller('subscriptions')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  // Create a new subscription
  @Post()
  async create(
    @Body() subscriptionData: Partial<Subscription>,
  ): Promise<Subscription> {
    return await this.subscriptionService.create(subscriptionData);
  }

  // Retrieve all subscriptions
  @Get()
  async findAll(): Promise<Subscription[]> {
    return await this.subscriptionService.findAll();
  }

  // Retrieve a specific subscription by ID
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Subscription> {
    return await this.subscriptionService.findOne(id);
  }

  // Update an existing subscription
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() subscriptionData: Partial<Subscription>,
  ): Promise<Subscription> {
    return await this.subscriptionService.update(id, subscriptionData);
  }

  // Delete a subscription by ID
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<{ message: string }> {
    await this.subscriptionService.delete(id);
    return { message: `Subscription with ID ${id} has been deleted` };
  }
}
