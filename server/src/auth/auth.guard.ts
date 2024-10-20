import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@modules/user/user.entity'; // User entity'si
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '@decorators/role.decorator';
import { errorMessages } from '@common/errorMessages';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly reflector: Reflector,
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

    const token = request.headers['authorization']?.split(' ')[1];
    if (!token) {
      throw new HttpException('Token not provided', HttpStatus.FORBIDDEN);
    }

    let decoded;
    try {
      decoded = this.jwtService.verify(token);
    } catch (err) {
      throw new HttpException(
        err.name === 'TokenExpiredError' ? 'Token expired' : 'Unauthorized',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const user = await this.userRepository.findOne({
      where: { id: decoded.id },
      relations: ['role', 'status'],
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (!user.status) {
      return false;
    }

    if (user.status.name === 'blocked') {
      throw new HttpException('User is blocked', HttpStatus.FORBIDDEN);
    }

    if (
      !this.compareDates(user.lastPasswordChange, decoded.lastPasswordChange)
    ) {
      throw new HttpException('Token is invalid', HttpStatus.UNAUTHORIZED);
    }

    if (!requiredRoles) {
      if (!user.role) {
        return false;
      }

      if (user.role.name !== 'admin') {
        throw new HttpException(
          errorMessages.UNAUTHORIZED_ADMIN,
          HttpStatus.UNAUTHORIZED,
        );
      }
    }

    request['user'] = user;

    return true;
  }

  private compareDates(
    lastPasswordChange: Date,
    tokenLastPasswordChange: Date,
  ): boolean {
    if (!lastPasswordChange || !tokenLastPasswordChange) {
      return true;
    }

    return (
      lastPasswordChange.getTime() ===
      new Date(tokenLastPasswordChange).getTime()
    );
  }
}
