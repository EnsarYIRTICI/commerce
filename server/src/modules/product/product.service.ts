import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { ImageProcessingService } from '@utils/image-processing.service';
import { MinioService } from '@database/minio/minio.service';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private minioService: MinioService,
    private imageProcessingService: ImageProcessingService,
  ) {}

  async createProductWithImage(productDto: ProductDto, imageBuffer: Buffer) {
    const processedImages =
      await this.imageProcessingService.processImage(imageBuffer);

    const bucketName = 'product-images';
    await this.minioService.ensureBucketExists(bucketName);

    const uploadPromises = processedImages.map((image) =>
      this.minioService.uploadImage(
        image.buffer,
        image.buffer.length,
        bucketName,
        `${productDto.name}-${image.name}.jpeg`,
        'image/jpeg',
      ),
    );

    const uploadedImagePaths = await Promise.all(uploadPromises);

    const newProduct = this.productRepository.create({
      name: productDto.name,
      description: productDto.description,
      price: productDto.price,
      stock: productDto.stock,
      createdAt: new Date(),
      images: uploadedImagePaths.map((url) => ({ url })),
      priceHistory: [
        {
          price: productDto.price,
          createdAt: new Date(),
        },
      ],
    });

    await this.productRepository.save(newProduct);

    return newProduct;
  }

  findAll() {
    return this.productRepository.find();
  }

  findOne(id: number) {
    return this.productRepository.findOne({ where: { id } });
  }

  create(product: Product) {
    return this.productRepository.save(product);
  }

  update(id: number, product: Product) {
    return this.productRepository.update(id, product);
  }

  delete(id: number) {
    return this.productRepository.delete(id);
  }
}
