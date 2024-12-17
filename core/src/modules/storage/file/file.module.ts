import { Module } from '@nestjs/common';
import { MinioService } from '../minio/minio.service';
import { FileService } from './file.service';
import { StorageService } from '../storage.service';
import { StorageModule } from '../storage.module';

@Module({
  imports: [StorageModule],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
