import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DineTable, TableStatus } from './table.entity';

@Injectable()
export class FloorplanService {
  constructor(
    @InjectRepository(DineTable)
    private tableRepo: Repository<DineTable>,
  ) {}

  async getTables() {
    return this.tableRepo.find({ order: { tableNumber: 'ASC' } });
  }

  async createTable(tableNumber: string, capacity: number) {
    const table = this.tableRepo.create({ tableNumber, capacity });
    return this.tableRepo.save(table);
  }

  async updateTableStatus(id: string, status: TableStatus) {
    const table = await this.tableRepo.findOneBy({ id });
    if (table) {
      table.status = status;
      return this.tableRepo.save(table);
    }
    return null;
  }
}
