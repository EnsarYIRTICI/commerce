import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { FileModule } from '@modules/storage/file/file.module';
import { SlugUtil } from '@utils/slug.util';

@Module({
  imports: [FileModule],
  exports: [FileModule],
})
export class ProductSharedModule {}
