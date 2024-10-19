
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActivityLog } from './activity_log.entity';

@Injectable()
export class ActivityLogService {
  constructor(
    @InjectRepository(ActivityLog)
    private activity_logRepository: Repository<ActivityLog>,
  ) {}

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
