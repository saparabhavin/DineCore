import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { FloorplanService } from './floorplan.service';
import { TableStatus } from './table.entity';

@Controller('floorplan')
export class FloorplanController {
  constructor(private readonly floorplanService: FloorplanService) {}

  @Get('tables')
  getTables() {
    return this.floorplanService.getTables();
  }

  @Post('tables')
  createTable(@Body() body: { tableNumber: string; capacity: number }) {
    return this.floorplanService.createTable(body.tableNumber, body.capacity);
  }

  @Put('tables/:id/status')
  updateTableStatus(@Param('id') id: string, @Body('status') status: TableStatus) {
    return this.floorplanService.updateTableStatus(id, status);
  }
}
