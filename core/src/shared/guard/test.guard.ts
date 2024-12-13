import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@modules/user/user.entity';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/shared/decorators/role.decorator';
import { errorMessages } from 'src/shared/common/errorMessages';
import { RedisService } from '@modules/cache/redis/redis.service';
import { getToken } from 'src/shared/utils/request.util';
import { compareDates } from 'src/shared/utils/date.util';

import { Response, Request } from 'express';
import { BlacklistService } from '@modules/cache/blacklist/blacklist.service';
import { UserService } from '@modules/user/user.service';

@Injectable()
export class TestGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    return true;
  }
}
