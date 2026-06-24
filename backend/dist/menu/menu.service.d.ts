import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { MenuItem } from './menu-item.entity';
export declare class MenuService {
    private categoryRepo;
    private itemRepo;
    constructor(categoryRepo: Repository<Category>, itemRepo: Repository<MenuItem>);
    getMenu(): Promise<{
        categories: Category[];
        items: MenuItem[];
    }>;
    createCategory(name: string): Promise<Category>;
    createItem(data: {
        name: string;
        price: number;
        categoryId: string;
    }): Promise<MenuItem>;
    toggleAvailability(id: string): Promise<MenuItem | null>;
}
