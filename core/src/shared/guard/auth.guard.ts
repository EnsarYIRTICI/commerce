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
import { RedisService } from '@modules/infrastructure/cache/redis/redis.service';
import { getToken } from 'src/shared/utils/request.util';
import { compareDates } from 'src/shared/utils/date.util';

import { Response, Request } from 'express';
import { BlacklistService } from '@modules/auth/blacklist/blacklist.service';
import { UserService } from '@modules/user/user.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
    private readonly blackListService: BlacklistService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (requiredRoles && requiredRoles.includes('public')) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();

    const token = getToken(request);

    if (!token) {
      throw new HttpException(
        errorMessages.NO_TOKEN_PROVIDED,
        HttpStatus.FORBIDDEN,
      );
    }

    // console.log(token);

    const isBlacklisted = await this.blackListService.isTokenListed(token);
    if (isBlacklisted) {
      throw new UnauthorizedException('Token is blacklisted');
    }

    let decoded;

    try {
      decoded = this.jwtService.verify(token);
    } catch (err) {
      throw new HttpException(
        err.name === 'TokenExpiredError'
          ? errorMessages.TOKEN_EXPIRED
          : errorMessages.UNAUTHORIZED,
        HttpStatus.UNAUTHORIZED,
      );
    }

    // console.log(decoded);

    const user = await this.userService.findOne(decoded.id);

    if (!user) {
      throw new HttpException(
        errorMessages.USER_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    if (!user.status || user.status.name === 'blocked') {
      throw new HttpException(errorMessages.USER_BLOCKED, HttpStatus.FORBIDDEN);
    }

    if (!compareDates(user.lastPasswordChange, decoded.lastPasswordChange)) {
      throw new HttpException(
        errorMessages.TOKEN_INVALID,
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (!requiredRoles) {
      if (!user.role || user.role.name !== 'admin') {
        throw new HttpException(
          errorMessages.UNAUTHORIZED_ADMIN,
          HttpStatus.UNAUTHORIZED,
        );
      }
    }

    request['user'] = user;

    return true;
  }
}
