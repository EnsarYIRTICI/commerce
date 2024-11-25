import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { ActivityLog } from '../activity_log.entity';

@Entity()
export class ActionType {
  // Fields for the entity

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  // Relationships for the entity

  @OneToMany(() => ActivityLog, (activityLog) => activityLog.actionType)
  activityLogs: ActivityLog[];
}
