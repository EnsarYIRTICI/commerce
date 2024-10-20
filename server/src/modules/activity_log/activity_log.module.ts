import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityLog } from './activity_log.entity';
import { ActivityLogService } from './activity_log.service';
import { ActivityLogController } from './activity_log.controller';
import { ActionType } from '@modules/action_type/action_type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ActivityLog, ActionType])],
  providers: [ActivityLogService],
  controllers: [ActivityLogController],
})
export class ActivityLogModule {}
