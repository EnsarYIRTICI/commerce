
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  findAll() {
    return this.roleRepository.find();
  }

  findOne(id: number) {
    return this.roleRepository.findOne({ where: { id } });
  }

  create(role: Role) {
    return this.roleRepository.save(role);
  }

  update(id: number, role: Role) {
    return this.roleRepository.update(id, role);
  }

  delete(id: number) {
    return this.roleRepository.delete(id);
  }
}
