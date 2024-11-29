import { Injectable } from '@nestjs/common';
import { Client } from 'minio';
import { StorageService } from '../storage.service';

@Injectable()
export class MinioService implements StorageService {
  private readonly minioClient: Client;

  constructor() {
    this.minioClient = new Client({
      endPoint: process.env.MINIO_ENDPOINT,
      port: parseInt(process.env.MINIO_PORT, 10),
      useSSL: process.env.MINIO_USE_SSL === 'true',
      accessKey: process.env.MINIO_ACCESS_KEY,
      secretKey: process.env.MINIO_SECRET_KEY,
    });
  }

  async testConnection() {
    try {
      const buckets = await this.minioClient.listBuckets();

      for (const bucket of buckets) {
        console.log('--> Bucket', bucket.name);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async isBucketExists(bucketName: string) {
    return await this.minioClient.bucketExists(bucketName);
  }

  async createBucket(bucketName: string) {
    await this.minioClient.makeBucket(bucketName, 'us-east-1');
  }

  async uploadFile(
    bucketName: string,
    buffer: Buffer,
    size: number,
    objectName: string,
    mimeType: string,
  ) {
    await this.minioClient.putObject(bucketName, objectName, buffer, size, {
      'Content-Type': mimeType,
    });

    return objectName;
  }

  async deleteFile(bucketName: string, objectName: string) {
    await this.minioClient.removeObject(bucketName, objectName);
  }
}
