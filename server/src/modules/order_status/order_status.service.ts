import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderStatus } from './order_status.entity';

@Injectable()
export class OrderStatusService {
  constructor(
    @InjectRepository(OrderStatus)
    private readonly orderStatusRepository: Repository<OrderStatus>,
  ) {}

  findAll(): Promise<OrderStatus[]> {
    return this.orderStatusRepository.find();
  }

  findOne(id: number): Promise<OrderStatus> {
    return this.orderStatusRepository.findOne({ where: { id } });
  }

  create(name: string, description: string): Promise<OrderStatus> {
    const orderStatus = this.orderStatusRepository.create({
      name,
      description,
    });
    return this.orderStatusRepository.save(orderStatus);
  }

  update(
    id: number,
    statusName: string,
    description: string,
  ): Promise<OrderStatus> {
    return this.orderStatusRepository.save({ id, statusName, description });
  }

  delete(id: number): Promise<void> {
    return this.orderStatusRepository.delete(id).then(() => {});
  }
}
