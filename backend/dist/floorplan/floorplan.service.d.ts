import { Repository } from 'typeorm';
import { DineTable, TableStatus } from './table.entity';
export declare class FloorplanService {
    private tableRepo;
    constructor(tableRepo: Repository<DineTable>);
    getTables(): Promise<DineTable[]>;
    createTable(tableNumber: string, capacity: number): Promise<DineTable>;
    updateTableStatus(id: string, status: TableStatus): Promise<DineTable | null>;
}
