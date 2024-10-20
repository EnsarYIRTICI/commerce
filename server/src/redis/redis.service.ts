import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { createClient } from 'redis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client;

  async onModuleInit() {
    this.client = createClient({
      url: process.env.REDIS_URL,
    });
    await this.client.connect();
    console.log('--> Connected to Redis');

    // const models = ['Role', 'Status'];

    // for (const model of models) {
    //   const data = await this.prisma[model.toLowerCase()].findMany();

    //   await this.set(model.toLowerCase(), data);
    //   console.log(`--> ${model} verileri Redis'e cache edildi`);
    // }
  }

  async onModuleDestroy() {
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
