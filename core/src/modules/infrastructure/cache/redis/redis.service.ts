import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';
import { CacheSystem } from '../cache.system';

@Injectable()
export class RedisService implements CacheSystem {
  private readonly client: RedisClientType;

  constructor() {
    this.client = createClient({
      url: process.env.REDIS_URL,
    });
  }

  async connect() {
    try {
      await this.client.connect();
      console.log('--> Connected to Redis');
    } catch (error) {
      throw new Error('--> Redis connection failed: ' + error.message);
    }
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
}
