import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { User } from '../user/user.entity';
import { ActionType } from '../action_type/action_type.entity';

@Entity()
export class ActivityLog {
  // Fields for the entity

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  log: string;

  @Column()
  timestamp: Date;

  // Relationships for the entity

  @ManyToOne(() => User, (user) => user.activityLogs, { nullable: false })
  user: User;

  @ManyToOne(() => ActionType, (actionType) => actionType.activityLogs, {
    nullable: false,
  })
  actionType: ActionType;
}
