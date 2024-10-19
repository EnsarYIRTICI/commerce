
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActionType } from './action_type.entity';

@Injectable()
export class ActionTypeService {
  constructor(
    @InjectRepository(ActionType)
    private action_typeRepository: Repository<ActionType>,
  ) {}

  findAll() {
    return this.action_typeRepository.find();
  }

  findOne(id: number) {
    return this.action_typeRepository.findOne({ where: { id } });
  }

  create(action_type: ActionType) {
    return this.action_typeRepository.save(action_type);
  }

  update(id: number, action_type: ActionType) {
    return this.action_typeRepository.update(id, action_type);
  }

  delete(id: number) {
    return this.action_typeRepository.delete(id);
  }
}
