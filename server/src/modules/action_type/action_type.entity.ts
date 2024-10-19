import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { ActivityLog } from '../activity_log/activity_log.entity'; // Additional imports for related entities

@Entity()
export class ActionType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  // Fields for the entity

  @Column()
  description: string;

  // Relationships for the entity

  @OneToMany(() => ActivityLog, (activityLog) => activityLog.actionType)
  activityLogs: ActivityLog[];
}
