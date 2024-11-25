import { Injectable, OnModuleInit } from '@nestjs/common';
import { getRepositoryToken, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository, TreeRepository } from 'typeorm';
import { ModuleRef } from '@nestjs/core';
import { ITreeEntity } from '@interface/ITreeEntity';
import { IStaticEntity } from '@interface/IStaticEntity';

@Injectable()
export class SeedService {
  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly dataSource: DataSource,
  ) {}

  async getRepository(entityClass: any) {
    const repositoryToken = getRepositoryToken(entityClass);
    return this.moduleRef.get(repositoryToken, { strict: false });
  }

  async seed<T>(
    entityClass: any,
    data: Array<{ [key: string]: any }>,
  ): Promise<void> {
    for (const item of data) {
      const repository: Repository<IStaticEntity> =
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
    const treeRepository: TreeRepository<ITreeEntity> =
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

      if (nodeData.subcategories && nodeData.subcategories.length > 0) {
        await this.seedTree(entityClass, nodeData.subcategories, node);
      }
    }
  }

  async seedAttribute(
    attributeEntity: any,
    valueEntity: any,
    data: Array<{ [key: string]: any }>,
  ) {
    for (const attribute of data) {
      const attributeRepository = await this.getRepository(attributeEntity);

      const existingAttribute = await attributeRepository.findOne({
        where: { name: attribute.name },
      });

      let savedAttribute;

      if (!existingAttribute) {
        const attributeEntity = attributeRepository.create({
          name: attribute.name,
        });
        savedAttribute = await attributeRepository.save(attributeEntity);
      } else {
        savedAttribute = existingAttribute;
      }

      const valueRepository = await this.getRepository(valueEntity);

      for (const value of attribute.values) {
        const existingValue = await valueRepository.findOne({
          where: {
            name: value.name,
            value: value.value,
            productAttribute: savedAttribute,
          },
        });

        if (!existingValue) {
          const valueEntity = valueRepository.create({
            name: value.name,
            value: value.value,
            productAttribute: savedAttribute,
          });
          await valueRepository.save(valueEntity);
        } else {
        }
      }
    }
  }
}
