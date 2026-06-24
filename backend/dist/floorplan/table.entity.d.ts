export declare enum TableStatus {
    AVAILABLE = "AVAILABLE",
    OCCUPIED = "OCCUPIED",
    RESERVED = "RESERVED"
}
export declare class DineTable {
    id: string;
    tableNumber: string;
    capacity: number;
    status: TableStatus;
}
