import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { MenuService } from './menu.service';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  getMenu() {
    return this.menuService.getMenu();
  }

  @Post('categories')
  createCategory(@Body('name') name: string) {
    return this.menuService.createCategory(name);
  }

  @Post('items')
  createItem(@Body() body: { name: string; price: number; categoryId: string }) {
    return this.menuService.createItem(body);
  }

  @Put('items/:id/availability')
  toggleAvailability(@Param('id') id: string) {
    return this.menuService.toggleAvailability(id);
  }
}
