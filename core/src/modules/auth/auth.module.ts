import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from '@modules/user/user.entity';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from '../../shared/guard/auth.guard';
import { Role } from '@modules/user/entities/role.entity';
import { Status } from '@modules/user/entities/status.entity';
import { RedisService } from '@modules/cache/redis/redis.service';
import { BlacklistService } from '@modules/cache/blacklist/blacklist.service';
import { BlackListModule } from '@modules/cache/blacklist/blacklist.module';

@Module({
  imports: [
    BlackListModule,
    TypeOrmModule.forFeature([User, Role, Status]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key',
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '1h' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [JwtModule],
})
export class AuthModule {}
