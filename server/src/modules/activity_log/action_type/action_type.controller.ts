
import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { ActionTypeService } from './action_type.service';
import { ActionType } from './action_type.entity';

@Controller('action_types')
export class ActionTypeController {
  constructor(private readonly action_typeService: ActionTypeService) {}

  @Get()
  findAll() {
    return this.action_typeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.action_typeService.findOne(id);
  }

  @Post()
  create(@Body() action_type: ActionType) {
    return this.action_typeService.create(action_type);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() action_type: ActionType) {
    return this.action_typeService.update(id, action_type);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.action_typeService.delete(id);
  }
}
