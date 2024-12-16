import { Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AttributeSeedService } from './attribute.seed.service';

@ApiBearerAuth()
@ApiTags('Attribute')
@Controller('attributes')
export class AttributeController {
  constructor(private readonly attributeSeedService: AttributeSeedService) {}

  @ApiBearerAuth()
  @Post('product-attribute')
  async product_attribute() {
    await this.attributeSeedService.product_attribute();
  }
}
