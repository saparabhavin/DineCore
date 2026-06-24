import { FloorplanService } from './floorplan.service';
import { TableStatus } from './table.entity';
export declare class FloorplanController {
    private readonly floorplanService;
    constructor(floorplanService: FloorplanService);
    getTables(): Promise<import("./table.entity").DineTable[]>;
    createTable(body: {
        tableNumber: string;
        capacity: number;
    }): Promise<import("./table.entity").DineTable>;
    updateTableStatus(id: string, status: TableStatus): Promise<import("./table.entity").DineTable | null>;
}
