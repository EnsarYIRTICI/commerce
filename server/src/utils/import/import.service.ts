import { Injectable } from '@nestjs/common';
import { readdirSync } from 'fs';
import { join } from 'path';

@Injectable()
export class ImportService {
  static modulesPath = join(__dirname, '..', '..', 'modules');

  static getModules() {
    return readdirSync(this.modulesPath)
      .filter((file) => !file.includes('.'))
      .map((folder) => {
        const module = require(
          `${this.modulesPath}/${folder}/${folder}.module`,
        );
        return module[Object.keys(module)[0]];
      });
  }

  static getEntities() {
    return readdirSync(this.modulesPath)
      .filter((file) => !file.includes('.'))
      .map((folder) => {
        const entityModule = require(
          `${this.modulesPath}/${folder}/${folder}.entity`,
        );
        return entityModule[Object.keys(entityModule)[0]];
      });
  }
}
