import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { MinioService } from './minio/minio.service';

@Module({
  imports: [],
  providers: [
    {
      provide: StorageService,
      useClass: MinioService,
    },
  ],
  exports: [StorageService],
})
export class StorageModule {
  constructor(private readonly storageService: StorageService) {}

  async onModuleInit() {
    await this.storageService.testConnection();
  }
}
