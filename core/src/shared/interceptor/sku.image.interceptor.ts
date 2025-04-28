import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import fs from 'fs';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { SharpUtil } from 'src/shared/utils/sharp.util';
import { UpdateSkuImageDto } from '@modules/sku/dto/update-sku-image.dto';
import { FileService } from '@modules/file/file.service';

@Injectable()
export class SkuImageInterceptor implements NestInterceptor {
  constructor(
    private readonly fileService: FileService,
    private readonly sharpUtil: SharpUtil,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();

    const file: any = request.file;
    const body: UpdateSkuImageDto = request.body;

    if (file) {
      const bucketName = 'product-images';
      await this.fileService.init(bucketName);

      try {
        const buffer = await fs.promises.readFile(file.filepath);

        const { processedImages, baseImageName } =
          await this.sharpUtil.processImage(buffer);

        for (const image of processedImages) {
          await this.fileService.upload(
            image.buffer,
            image.buffer.length,
            image.name,
            file.mimetype,
          );
        }

        body.image = baseImageName;
      } catch (error) {
        throw error;
      }
    }
    return next.handle();
  }
}
