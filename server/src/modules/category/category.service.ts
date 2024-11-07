import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository, TreeRepository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Category)
    private readonly categoryTreeRepository: TreeRepository<Category>,
  ) {}

  async findByIds(ids: number[]) {
    return await this.categoryRepository.find({
      where: {
        id: In(ids),
      },
    });
  }
  async getCategoryTree() {
    return await this.categoryTreeRepository.findTrees();
  }

  async getCategoryWithDescendants(categoryId: number) {
    const category = await this.categoryTreeRepository.findOne({
      where: {
        id: categoryId,
      },
    });
    return await this.categoryTreeRepository.findDescendantsTree(category);
  }

  findAll() {
    return this.categoryRepository.find();
  }

  findOne(id: number) {
    return this.categoryRepository.findOne({ where: { id } });
  }

  create(category: Category) {
    return this.categoryRepository.save(category);
  }

  update(id: number, category: Category) {
    return this.categoryRepository.update(id, category);
  }

  delete(id: number) {
    return this.categoryRepository.delete(id);
  }
}
