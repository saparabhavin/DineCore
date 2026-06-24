import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DineTable } from './table.entity';
import { FloorplanService } from './floorplan.service';
import { FloorplanController } from './floorplan.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DineTable])],
  providers: [FloorplanService],
  controllers: [FloorplanController],
})
export class FloorplanModule {}
