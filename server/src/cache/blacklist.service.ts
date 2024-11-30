import { RedisService } from './redis.service';

export class BlacklistService {
  constructor(private readonly redisService: RedisService) {}

  async addTokenTolist(token: string): Promise<void> {
    await this.redisService.set(token, 'blacklisted');
  }

  async isTokenListed(token: string): Promise<boolean> {
    const result = await this.redisService.get(token);
    return result === 'blacklisted';
  }
}
