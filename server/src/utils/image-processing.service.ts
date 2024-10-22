import { Injectable } from '@nestjs/common';
import sharp from 'sharp';

@Injectable()
export class ImageProcessingService {
  async processImage(buffer: Buffer) {
    const sizes = [
      { name: 'xs', width: 24 },
      { name: 's', width: 32 },
      { name: 'm', width: 64 },
      { name: 'l', width: 128 },
      { name: 'xl', width: 256 },
      { name: 'xxl', width: 512 },
    ];

    const processedImages = await Promise.all(
      sizes.map((size) =>
        sharp(buffer)
          .resize(size.width)
          .toBuffer()
          .then((data) => ({ name: size.name, buffer: data })),
      ),
    );

    return processedImages;
  }
}
