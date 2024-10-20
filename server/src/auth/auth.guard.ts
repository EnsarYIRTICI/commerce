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

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    // Authorization header'dan JWT token'ını al
    const token = request.headers['authorization']?.split(' ')[1];
    if (!token) {
      throw new HttpException('Token not provided', HttpStatus.FORBIDDEN);
    }

    let decoded;
    try {
      decoded = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
    } catch (err) {
      throw new HttpException(
        err.name === 'TokenExpiredError' ? 'Token expired' : 'Unauthorized',
        HttpStatus.UNAUTHORIZED,
      );
    }

    // User'ı TypeORM repository ile bul, Role ve Status ilişkilerini dahil et
    const user = await this.userRepository.findOne({
      where: { id: decoded.id },
      relations: ['role', 'status'],
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    // Kullanıcının durumu "blocked" ise
    if (user.status && user.status.name === 'blocked') {
      throw new HttpException('User is blocked', HttpStatus.FORBIDDEN);
    }

    // Şifre değişikliği sonrası token'ı geçersiz yap
    if (
      !this.compareDates(user.lastPasswordChange, decoded.lastPasswordChange)
    ) {
      throw new HttpException('Token is invalid', HttpStatus.UNAUTHORIZED);
    }

    // Kullanıcının admin olup olmadığını kontrol et
    request['isAdmin'] = user.role && user.role.name === 'admin';
    request['user'] = user;

    return true; // Erişim izni veriliyor
  }

  // Tarih karşılaştırma fonksiyonu
  private compareDates(
    lastPasswordChange: Date,
    tokenLastPasswordChange: Date,
  ): boolean {
    return (
      lastPasswordChange.getTime() ===
      new Date(tokenLastPasswordChange).getTime()
    );
  }
}
