import { Module } from '@nestjs/common';
import { PaymentSystem } from './payment/payment.system';
import { IyzicoService } from './payment/iyzico/iyzico.service';
import { CacheSystem } from './cache/cache.system';
import { RedisService } from './cache/redis/redis.service';
import { StorageService } from './storage/storage.service';
import { MinioService } from './storage/minio/minio.service';
import { IyzicoUtil } from '@shared/utils/iyzico.util';

@Module({
  imports: [],
  providers: [
    IyzicoUtil,
    {
      provide: CacheSystem,
      useClass: RedisService,
    },
    {
      provide: StorageService,
      useClass: MinioService,
    },
    {
      provide: PaymentSystem,
      useClass: IyzicoService,
    },
  ],
  exports: [CacheSystem, StorageService, PaymentSystem],
})
export class InfrastructureModule {
  constructor(
    private readonly cacheSystem: CacheSystem,
    private readonly storageService: StorageService,
    private readonly paymentSystem: PaymentSystem,
  ) {}

  async onModuleInit() {
    await this.cacheSystem.connect();
    await this.storageService.testConnection();
    await this.paymentSystem.test();
  }
}
