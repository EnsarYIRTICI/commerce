import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Subscription } from '@modules/payment/subscription/subscription.entity';
import { RoleModule } from './role/role.module';
import { StatusModule } from './status/status.module';

@Module({
  imports: [StatusModule, RoleModule, TypeOrmModule.forFeature([User])],
  providers: [UserService],
  exports: [UserService],
})
export class UserCoreModule {}
