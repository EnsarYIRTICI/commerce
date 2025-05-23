import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from '@modules/user/user.entity';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from '../../shared/guard/auth.guard';
import { Role } from '@modules/user/entities/role.entity';
import { Status } from '@modules/user/entities/status.entity';
import { BlacklistService } from '@modules/auth/blacklist/blacklist.service';
import { BlackListModule } from '@modules/auth/blacklist/blacklist.module';

@Module({
  imports: [
    JwtModule,
    BlackListModule,
    TypeOrmModule.forFeature([User, Role, Status]),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
