import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { StatusService } from './status.service';
import { Status } from './status.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Status')
@Controller('statuses')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Get()
  findAll() {
    return this.statusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.statusService.findOne(id);
  }

  @Post()
  create(@Body() status: Status) {
    return this.statusService.create(status);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() status: Status) {
    return this.statusService.update(id, status);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.statusService.delete(id);
  }
}
