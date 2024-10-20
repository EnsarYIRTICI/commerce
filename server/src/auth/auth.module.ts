import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from '@modules/user/user.entity'; // User entity
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from '@utils/jwt/jwt.service'; // JWT işlemleri için
import { JwtAuthGuard } from './auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // User entity'yi ekliyoruz
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService, JwtAuthGuard],
  exports: [AuthService, JwtAuthGuard],
})
export class AuthModule {}
