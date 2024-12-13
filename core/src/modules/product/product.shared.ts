import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { FileModule } from '@modules/storage/file/file.module';

@Module({
  imports: [FileModule],
  exports: [FileModule],
})
export class ProductSharedModule {}
