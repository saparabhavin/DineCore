import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { MenuItem } from './menu-item.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
    @InjectRepository(MenuItem)
    private itemRepo: Repository<MenuItem>,
  ) {}

  async getMenu() {
    const categories = await this.categoryRepo.find();
    const items = await this.itemRepo.find({ relations: ['category'] });
    return { categories, items };
  }

  async createCategory(name: string) {
    const cat = this.categoryRepo.create({ name });
    return this.categoryRepo.save(cat);
  }

  async createItem(data: { name: string; price: number; categoryId: string }) {
    const item = this.itemRepo.create(data);
    return this.itemRepo.save(item);
  }

  async toggleAvailability(id: string) {
    const item = await this.itemRepo.findOneBy({ id });
    if (item) {
      item.isAvailable = !item.isAvailable;
      return this.itemRepo.save(item);
    }
    return null;
  }
}
