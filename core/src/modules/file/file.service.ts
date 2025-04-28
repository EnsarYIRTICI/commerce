import { StorageService } from '@modules/infrastructure/storage/storage.service';
import { Injectable } from '@nestjs/common';
import { Client } from 'minio';

@Injectable()
export class FileService {
  constructor(private readonly storage: StorageService) {}

  private bucketName: string;

  async init(bucketName: string) {
    const isExist = await this.storage.isBucketExists(bucketName);

    if (!isExist) {
      await this.storage.createBucket(bucketName);
    }

    this.bucketName = bucketName;
  }

  async upload(
    buffer: Buffer,
    size: number,
    objectName: string,
    mimeType: string,
  ) {
    return await this.storage.uploadFile(
      this.bucketName,
      buffer,
      size,
      objectName,
      mimeType,
    );
  }

  async delete(objectName: string) {
    await this.storage.deleteFile(this.bucketName, objectName);
  }
}
