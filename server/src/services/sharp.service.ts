import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import sharp, { OverlayOptions } from 'sharp';

@Injectable()
export class SharpService {
  async resizeImage(buffer: Buffer, width: number) {
    return await sharp(buffer).resize(width).toBuffer();
  }

  async processImage(buffer: Buffer) {
    const sizes = [
      { name: 'xs', width: 24 },
      { name: 's', width: 32 },
      { name: 'm', width: 64 },
      { name: 'l', width: 128 },
      { name: 'xl', width: 256 },
      { name: 'xxl', width: 512 },
    ];

    const baseImageName = uuidv4();

    const processedImages = [];

    for (const size of sizes) {
      const resizedBuffer = await this.resizeImage(buffer, size.width);
      const sizedName = `${baseImageName}_${size.name}`;

      processedImages.push({
        name: sizedName,
        buffer: resizedBuffer,
      });
    }

    return { processedImages, baseImageName };
  }
}