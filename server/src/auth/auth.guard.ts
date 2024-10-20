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
import { IS_PUBLIC_KEY } from './public.decorator';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
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

    if (user.status && user.status.name === 'blocked') {
      throw new HttpException('User is blocked', HttpStatus.FORBIDDEN);
    }

    // if (
    //   !this.compareDates(user.lastPasswordChange, decoded.lastPasswordChange)
    // ) {
    //   throw new HttpException('Token is invalid', HttpStatus.UNAUTHORIZED);
    // }

    request['isAdmin'] = user.role && user.role.name === 'admin';
    request['user'] = user;

    return true;
  }

  private compareDates(
    lastPasswordChange: Date,
    tokenLastPasswordChange: Date,
  ): boolean {
    if (!lastPasswordChange || !tokenLastPasswordChange) {
      return false;
    }

    return (
      lastPasswordChange.getTime() ===
      new Date(tokenLastPasswordChange).getTime()
    );
  }
}
