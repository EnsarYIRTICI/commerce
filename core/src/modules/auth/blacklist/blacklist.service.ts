import { Inject, Injectable } from '@nestjs/common';
import { RedisService } from '../../infrastructure/cache/redis/redis.service';
import { CacheSystem } from '../../infrastructure/cache/cache.system';

@Injectable()
export class BlacklistService {
  constructor(private readonly cacheSystem: CacheSystem) {}

  async addTokenTolist(token: string): Promise<void> {
    await this.cacheSystem.set(token, 'blacklisted');
  }

  async isTokenListed(token: string): Promise<boolean> {
    const result = await this.cacheSystem.get(token);
    return result === 'blacklisted';
  }
}
