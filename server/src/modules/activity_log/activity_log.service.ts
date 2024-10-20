import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActivityLog } from './activity_log.entity';
import { ActionType } from '@modules/action_type/action_type.entity';
import { User } from '@modules/user/user.entity';

@Injectable()
export class ActivityLogService {
  constructor(
    @InjectRepository(ActivityLog)
    private activity_logRepository: Repository<ActivityLog>,

    @InjectRepository(ActionType)
    private readonly actionTypeRepository: Repository<ActionType>,
  ) {}

  async logActivity(user: User, actionName: string) {
    const actionType = await this.actionTypeRepository.findOne({
      where: { name: actionName },
    });

    if (!actionType) {
      throw new Error('Action type not found');
    }

    const activityLog = this.activity_logRepository.create({
      user,
      actionType,
      timestamp: new Date(),
    });

    await this.activity_logRepository.save(activityLog);
  }

  findAll() {
    return this.activity_logRepository.find();
  }

  findOne(id: number) {
    return this.activity_logRepository.findOne({ where: { id } });
  }

  create(activity_log: ActivityLog) {
    return this.activity_logRepository.save(activity_log);
  }

  update(id: number, activity_log: ActivityLog) {
    return this.activity_logRepository.update(id, activity_log);
  }

  delete(id: number) {
    return this.activity_logRepository.delete(id);
  }
}
