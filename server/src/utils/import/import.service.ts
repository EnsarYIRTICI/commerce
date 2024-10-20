import { Injectable } from '@nestjs/common';
import { readdirSync } from 'fs';
import { join } from 'path';

@Injectable()
export class ImportService {
  // __dirname kullanarak uygulamanın doğru çalışma dizinini alıyoruz
  private readonly modulesPath = join(__dirname, '..', '..', 'modules');

  // Modülleri dinamik olarak yükleyen fonksiyon
  getModules() {
    return readdirSync(this.modulesPath)
      .filter((file) => !file.includes('.'))
      .map((folder) => {
        const module = require(
          `${this.modulesPath}/${folder}/${folder}.module`,
        );
        return module[Object.keys(module)[0]]; // Dinamik olarak export edilen modülü alıyoruz
      });
  }

  // Entity'leri dinamik olarak yükleyen fonksiyon
  getEntities() {
    return readdirSync(this.modulesPath)
      .filter((file) => !file.includes('.'))
      .map((folder) => {
        const entityModule = require(
          `${this.modulesPath}/${folder}/${folder}.entity`,
        );
        return entityModule[Object.keys(entityModule)[0]]; // Dinamik olarak entity'yi alıyoruz
      });
  }
}
