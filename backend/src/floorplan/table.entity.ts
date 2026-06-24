import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum TableStatus {
  AVAILABLE = 'AVAILABLE',
  OCCUPIED = 'OCCUPIED',
  RESERVED = 'RESERVED',
}

@Entity()
export class DineTable {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  tableNumber: string;

  @Column('int')
  capacity: number;

  @Column({
    type: 'varchar',
    enum: TableStatus,
    default: TableStatus.AVAILABLE,
  })
  status: TableStatus;
}
