import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { createClient } from 'redis';

@Injectable()
export class RedisService {
  private client;

  async connect() {
    this.client = createClient({
      url: process.env.REDIS_URL,
    });
    await this.client.connect();
    console.log('--> Connected to Redis');
  }

  async disconnect() {
    await this.client.disconnect();
    console.log('--> Disconnected from Redis');
  }

  async set(key: string, value: any) {
    await this.client.set(key, JSON.stringify(value));
  }

  async get(key: string) {
    const data = await this.client.get(key);
    return data ? JSON.parse(data) : null;
  }

  async del(key: string) {
    await this.client.del(key);
  }

  async addTokenToBlacklist(token: string, expiresIn: number): Promise<void> {
    await this.client.set(token, 'blacklisted', 'EX', expiresIn);
  }

  async isTokenBlacklisted(token: string): Promise<boolean> {
    const result = await this.client.get(token);
    return result === 'blacklisted';
  }
}
