import { Category } from './category.entity';
export declare class MenuItem {
    id: string;
    name: string;
    price: number;
    isAvailable: boolean;
    category: Category;
    categoryId: string;
}
