import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from './subscription.entity';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
  ) {}

  // Create a new subscription
  async create(subscriptionData: Partial<Subscription>): Promise<Subscription> {
    const subscription = this.subscriptionRepository.create(subscriptionData);
    return await this.subscriptionRepository.save(subscription);
  }

  // Retrieve all subscriptions
  async findAll(): Promise<Subscription[]> {
    return await this.subscriptionRepository.find({
      relations: ['user', 'invoices'],
    });
  }

  // Retrieve a specific subscription by ID
  async findOne(id: number): Promise<Subscription> {
    return await this.subscriptionRepository.findOne({
      where: { id },
      relations: ['user', 'invoices'],
    });
  }

  // Update an existing subscription
  async update(
    id: number,
    subscriptionData: Partial<Subscription>,
  ): Promise<Subscription> {
    const subscription = await this.subscriptionRepository.findOne({
      where: { id },
    });
    if (!subscription) {
      throw new Error(`Subscription with ID ${id} not found`);
    }
    Object.assign(subscription, subscriptionData);
    return await this.subscriptionRepository.save(subscription);
  }

  // Delete a subscription by ID
  async delete(id: number): Promise<void> {
    const result = await this.subscriptionRepository.delete(id);
    if (result.affected === 0) {
      throw new Error(`Subscription with ID ${id} not found`);
    }
  }
}
