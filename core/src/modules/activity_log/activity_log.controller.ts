import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ActivityLogService } from './activity_log.service';
import { ActivityLog } from './activity_log.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Activity Log')
@Controller('activity_logs')
export class ActivityLogController {
  constructor(private readonly activity_logService: ActivityLogService) {}

  @Get()
  findAll() {
    return this.activity_logService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.activity_logService.findOne(id);
  }

  @Post()
  create(@Body() activity_log: ActivityLog) {
    return this.activity_logService.create(activity_log);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() activity_log: ActivityLog) {
    return this.activity_logService.update(id, activity_log);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.activity_logService.delete(id);
  }
}
