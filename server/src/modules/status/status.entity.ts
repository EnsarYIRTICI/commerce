import { Entity, OneToMany } from 'typeorm';
import { StaticEntity } from '@entities/static.entity';
import { User } from '@modules/user/user.entity';

@Entity()
export class Status extends StaticEntity {
  @OneToMany(() => User, (user) => user.status)
  users: User[];
}
