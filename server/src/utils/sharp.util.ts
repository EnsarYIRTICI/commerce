import { v4 as uuidv4 } from 'uuid';
import sharp, { OverlayOptions } from 'sharp';

async function resizeImage(buffer: Buffer, width: number) {
  return await sharp(buffer).resize(width).toBuffer();
}

async function processImage(buffer: Buffer) {
  const sizes = [
    { name: 'xs', width: 32 },
    { name: 's', width: 64 },
    { name: 'm', width: 128 },
    { name: 'l', width: 256 },
    { name: 'xl', width: 512 },
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

export { resizeImage, processImage };
