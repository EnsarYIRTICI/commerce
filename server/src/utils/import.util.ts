import { Injectable } from '@nestjs/common';
import { readdirSync } from 'fs';
import { join } from 'path';

@Injectable()
export class ImportUtil {
  static modulesPath = join(__dirname, '..', 'modules');

  static get(extname: 'entity' | 'module') {
    return readdirSync(this.modulesPath)
      .filter((file) => !file.includes('.'))
      .map((folder) => {
        const entityModule = require(
          `${this.modulesPath}/${folder}/${folder}.${extname}`,
        );
        return entityModule[Object.keys(entityModule)[0]];
      });
  }
}
