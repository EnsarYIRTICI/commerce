import { Injectable } from '@nestjs/common';
import { Client } from 'minio';

@Injectable()
export class MinioService {
  private minioClient: Client;

  constructor() {
    this.minioClient = new Client({
      endPoint: process.env.MINIO_ENDPOINT,
      port: parseInt(process.env.MINIO_PORT, 10),
      useSSL: process.env.MINIO_USE_SSL === 'true',
      accessKey: process.env.MINIO_ACCESS_KEY,
      secretKey: process.env.MINIO_SECRET_KEY,
    });
  }

  // Dosya yükleme

  async uploadImage(
    buffer: Buffer,
    size: number,
    bucketName: string,
    objectName: string,
    mimeType: string,
  ) {
    await this.minioClient.putObject(bucketName, objectName, buffer, size, {
      'Content-Type': mimeType,
    });

    return `${bucketName}/${objectName}`;
  }

  // Bucket oluşturma

  async ensureBucketExists(bucketName: string) {
    const bucketExists = await this.minioClient.bucketExists(bucketName);
    if (!bucketExists) {
      await this.minioClient.makeBucket(bucketName, 'us-east-1');
    }
  }
}
