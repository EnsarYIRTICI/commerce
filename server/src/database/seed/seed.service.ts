import { Injectable, OnModuleInit } from '@nestjs/common';
import { getRepositoryToken, InjectRepository } from '@nestjs/typeorm';
import { Repository, TreeRepository } from 'typeorm';
import { ModuleRef } from '@nestjs/core';
import { TreeEntity } from '@entities/tree.entity';
import { StaticEntity } from '@entities/static.entity';

@Injectable()
export class SeedService {
  constructor(private moduleRef: ModuleRef) {}

  async getRepository(entityClass: any) {
    const repositoryToken = getRepositoryToken(entityClass);
    return this.moduleRef.get(repositoryToken, { strict: false });
  }

  async seed<T>(
    entityClass: any,
    data: Array<{ [key: string]: any }>,
  ): Promise<void> {
    for (const item of data) {
      const repository: Repository<StaticEntity> =
        await this.getRepository(entityClass);

      const existingItem = await repository.findOne({
        where: { name: item['name'] },
      });

      if (!existingItem) {
        await repository.save(item);
      }
    }
  }

  async seedTree<T>(
    entityClass: any,
    treeData: any[],
    parent: T = null,
  ): Promise<void> {
    const treeRepository: TreeRepository<TreeEntity> =
      await this.getRepository(entityClass);

    for (const nodeData of treeData) {
      let node = await treeRepository.findOne({
        where: { name: nodeData.name },
      });

      if (!node) {
        node = treeRepository.create({
          name: nodeData.name,
          description: nodeData.description,
          parent: parent,
        } as T);

        node = await treeRepository.save(node);
      }

      if (nodeData.children && nodeData.children.length > 0) {
        await this.seedTree(entityClass, nodeData.children, node);
      }
    }
  }
}
