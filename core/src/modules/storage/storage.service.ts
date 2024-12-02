export abstract class StorageService {
  abstract isBucketExists(bucketName: string): Promise<boolean>;
  abstract createBucket(bucketName: string): Promise<void>;
  abstract uploadFile(
    bucketName: string,
    buffer: Buffer,
    size: number,
    objectName: string,
    mimeType: string,
  ): Promise<string>;
  abstract deleteFile(bucketName: string, objectName: string): Promise<void>;
}
