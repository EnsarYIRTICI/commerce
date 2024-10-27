import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Product } from './product.entity';
import { ImageProcessingService } from '@utils/image-processing.service';
import { MinioService } from '@database/minio/minio.service';
import { CreateProductDto } from './dto/create_product.dto';
import { ProductVariant } from '@modules/product_variant/product_variant.entity';
import { VariantAttributeValueItem } from '@modules/variant_attribute_value_item/variant_attribute_value_item.entity';
import { ProductImage } from '@modules/product_image/product_image.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private minioService: MinioService,
    private imageProcessingService: ImageProcessingService,
    private dataSource: DataSource,

    @InjectRepository(ProductVariant)
    private productVariantRepository: Repository<ProductVariant>,

    @InjectRepository(VariantAttributeValueItem)
    private variantAttributeValueItemRepository: Repository<VariantAttributeValueItem>,
  ) {}

  async createProduct(
    createProductDto: CreateProductDto,
    images: Express.Multer.File[], // Birden fazla dosya için images parametresi
  ): Promise<Product> {
    const queryRunner = this.dataSource.createQueryRunner();

    // Transaction başlat
    await queryRunner.connect();
    await queryRunner.startTransaction();

    let bucketName = 'product-images';
    let uploadedImagePaths = [];

    try {
      const { name, description, variants } = createProductDto;

      // 1. Ana Product oluştur ve kaydet
      const product = this.productRepository.create({
        name,
        description,
        createdAt: new Date(),
      });
      const savedProduct = await queryRunner.manager.save(product);

      // 2. Görüntü yükleme işlemleri için bucket oluştur
      await this.minioService.ensureBucketExists(bucketName);

      // 3. Her varyant ve onun görsellerini işleyip yükleme
      const productVariants = await Promise.all(
        variants.map(async (variantDto, index) => {
          const { attributeValues, ...variantData } = variantDto;

          // 3a. Varyant için nesne oluştur
          const variant = this.productVariantRepository.create({
            ...variantData,
            product: savedProduct,
          });

          // 3b. Varyantın attribute değerlerini al ve ilişkilendir
          const attributes =
            await this.variantAttributeValueItemRepository.findByIds(
              attributeValues,
            );
          variant.attributeValues = attributes;

          // 3c. Görüntüleri işle ve yükle
          const variantImages = images.filter(
            (img, imgIndex) => imgIndex === index, // Varyanta ait dosyaları belirlemek için filtreleme
          );

          const processedImages = await Promise.all(
            variantImages.map((image) =>
              this.imageProcessingService.processImage(image.buffer),
            ),
          );

          const uploadPromises = processedImages.flatMap((processed) =>
            processed.map((image) =>
              this.minioService.uploadImage(
                image.buffer,
                image.buffer.length,
                bucketName,
                `${createProductDto.name}-${variantDto.name}-${image.name}.jpeg`,
                'image/jpeg',
              ),
            ),
          );

          const variantImagePaths = await Promise.all(uploadPromises);
          uploadedImagePaths.push(...variantImagePaths);

          // Görüntü yollarını veritabanına kaydet

          const productImages = await Promise.all(
            variantImagePaths.map((path) => {
              const productImage = new ProductImage();
              productImage.name = `${createProductDto.name}-${variantDto.name}-image`;
              productImage.url = path;
              productImage.format = 'image/jpeg';
              productImage.product = variant; // Varyantla ilişkilendir
              return queryRunner.manager.save(productImage);
            }),
          );

          // Görüntüleri varyanta ekle
          variant.images = productImages;

          return await queryRunner.manager.save(variant);
        }),
      );

      // Product'a varyantları ekle
      savedProduct.variants = productVariants;

      // Transaction'u başarıyla sonlandır ve kaydet
      await queryRunner.commitTransaction();
      return savedProduct;
    } catch (error) {
      // Hata durumunda tüm işlemi geri al
      await queryRunner.rollbackTransaction();

      // MinIO'da yüklenen dosyaları sil
      if (uploadedImagePaths.length) {
        await Promise.all(
          uploadedImagePaths.map((path) =>
            this.minioService.deleteImage(bucketName, path),
          ),
        );
      }

      throw error;
    } finally {
      // Bağlantıyı kapat
      await queryRunner.release();
    }
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
