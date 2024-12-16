import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '@modules/user/user.entity';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { Role } from '@modules/user/entities/role.entity';
import { Status } from '@modules/user/entities/status.entity';
import { RedisService } from '@modules/cache/redis/redis.service';
import { BlacklistService } from '@modules/cache/blacklist/blacklist.service';
import { CacheSystem } from '../cache.system';

@Module({
  imports: [],
  providers: [
    BlacklistService,
    {
      provide: CacheSystem,
      useClass: RedisService,
    },
  ],
  exports: [BlacklistService],
})
export class BlackListModule {
  constructor(private readonly cacheSystem: CacheSystem) {}

  async onModuleInit() {
    await this.cacheSystem.connect();
  }
}
