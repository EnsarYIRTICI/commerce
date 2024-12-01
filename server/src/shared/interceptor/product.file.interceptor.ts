import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { min, Observable } from 'rxjs';
import { Request } from 'express';
import { MinioService } from '@modules/storage/minio/minio.service';

import { processImage } from 'src/shared/utils/sharp.util';

import fs from 'fs';
import { FileService } from '@modules/storage/file.service';
import { StorageService } from '@modules/storage/storage.service';

@Injectable()
export class ProductFileInterceptor implements NestInterceptor {
  constructor(private readonly fileService: FileService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();

    const files = request.files;
    const body = request.body;

    // console.log('Interceptor: Files', files);
    // console.log('Interceptor: Body', body);

    const bucketName = 'product-images';

    await this.fileService.init(bucketName);

    if (body.variants && Array.isArray(body.variants)) {
      for (const variant of body.variants) {
        if (variant.filesId) {
          const fileId = variant.filesId;
          const filesArray = files[fileId];

          if (filesArray && Array.isArray(filesArray)) {
            const uploadedFilesUrls = [];

            for (const file of filesArray) {
              try {
                const buffer = await fs.promises.readFile(file.filepath);

                // console.log('Interceptor File Path: ', file.filepath);
                // console.log('Interceptor Buffer Length', buffer.length);

                const { processedImages, baseImageName } =
                  await processImage(buffer);

                for (const image of processedImages) {
                  await this.fileService.upload(
                    image.buffer,
                    image.buffer.length,
                    image.name,
                    file.mimetype,
                  );
                }

                uploadedFilesUrls.push(baseImageName);
              } catch (error) {
                throw error;
              }
            }

            variant.images = uploadedFilesUrls;
          }
        }
      }
    }

    return next.handle();
  }
}
