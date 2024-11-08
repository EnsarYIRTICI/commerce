import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from '@modules/user/user.entity';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './auth.guard';
import { Role } from '@modules/role/role.entity';
import { Status } from '@modules/status/status.entity';
import { RedisService } from 'src/services/redis.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, Status]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key',
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthGuard, RedisService],
  exports: [AuthService, JwtModule, JwtAuthGuard],
})
export class AuthModule {}
