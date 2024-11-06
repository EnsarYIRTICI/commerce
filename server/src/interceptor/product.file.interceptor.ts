import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { MinioService } from '@database/minio/minio.service';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import { SharpService } from 'src/services/sharp.service';
import { plainToInstance } from 'class-transformer';
import { CreateProductDto } from '@modules/product/dto/create_product.dto';

@Injectable()
export class ProductFileInterceptor implements NestInterceptor {
  constructor(
    private readonly minioService: MinioService,
    private readonly sharpService: SharpService,
  ) {}

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
                  await this.sharpService.processImage(buffer);

                for (const image of processedImages) {
                  await this.minioService.uploadFile(
                    image.buffer,
                    image.buffer.length,
                    bucketName,
                    baseImageName + '_' + image.name,
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
