import { Module } from '@nestjs/common';
import { MinioService } from './minio/minio.service';
import { FileService } from './file.service';
import { StorageService } from './storage.service';

@Module({
  providers: [
    {
      provide: StorageService,
      useClass: MinioService,
    },
    FileService,
  ],
  exports: [FileService],
})
export class StorageModule {}
