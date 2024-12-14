import slugify from 'slugify';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SlugUtil {
  create(name: string): string {
    return slugify(name, { lower: true, strict: true });
  }
}
