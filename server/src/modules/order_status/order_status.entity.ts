import { Entity, OneToMany } from 'typeorm';
import { StaticEntity } from '@entities/static.entity';
import { Order } from '@modules/order/order.entity';

@Entity()
export class OrderStatus extends StaticEntity {
  @OneToMany(() => Order, (order) => order.status)
  orders: Order[];
}
