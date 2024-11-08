import { readdirSync } from 'fs';
import { join } from 'path';

function getImports(extname: 'entity' | 'module') {
  const modulesPath = join(__dirname, '..', 'modules');

  return readdirSync(modulesPath)
    .filter((file) => !file.includes('.'))
    .map((folder) => {
      const entityModule = require(
        `${modulesPath}/${folder}/${folder}.${extname}`,
      );
      return entityModule[Object.keys(entityModule)[0]];
    });
}

export { getImports };
