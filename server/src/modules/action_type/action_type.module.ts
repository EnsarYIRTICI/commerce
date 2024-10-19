
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionType } from './action_type.entity';
import { ActionTypeService } from './action_type.service';
import { ActionTypeController } from './action_type.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ActionType])],
  providers: [ActionTypeService],
  controllers: [ActionTypeController],
})
export class ActionTypeModule {}
