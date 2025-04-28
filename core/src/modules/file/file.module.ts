import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { InfrastructureModule } from '@modules/infrastructure/infrastructure.module';

@Module({
  imports: [InfrastructureModule],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
