import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@modules/user/user.entity';
import { Role } from '@modules/user/role/role.entity';
import { Status } from '@modules/user/status/status.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from '@modules/auth/dto/register.dto';

@Injectable()
export class AppService {
  constructor() {}
}
