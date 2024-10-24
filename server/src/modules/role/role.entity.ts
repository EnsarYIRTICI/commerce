import { Entity, OneToMany } from 'typeorm';
import { StaticEntity } from '@entities/static.entity';
import { User } from '@modules/user/user.entity';

@Entity()
export class Role extends StaticEntity {
  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
