import { Module } from '@nestjs/common';

import { BlacklistService } from '@modules/auth/blacklist/blacklist.service';
import { InfrastructureModule } from '@modules/infrastructure/infrastructure.module';

@Module({
  imports: [InfrastructureModule],
  providers: [BlacklistService],
  exports: [BlacklistService],
})
export class BlackListModule {}
