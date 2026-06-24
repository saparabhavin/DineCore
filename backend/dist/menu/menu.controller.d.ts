import { MenuService } from './menu.service';
export declare class MenuController {
    private readonly menuService;
    constructor(menuService: MenuService);
    getMenu(): Promise<{
        categories: import("./category.entity").Category[];
        items: import("./menu-item.entity").MenuItem[];
    }>;
    createCategory(name: string): Promise<import("./category.entity").Category>;
    createItem(body: {
        name: string;
        price: number;
        categoryId: string;
    }): Promise<import("./menu-item.entity").MenuItem>;
    toggleAvailability(id: string): Promise<import("./menu-item.entity").MenuItem | null>;
}
