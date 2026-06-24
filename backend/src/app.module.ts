import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './orders/orders.module';
import { AuthModule } from './auth/auth.module';
import { MenuModule } from './menu/menu.module';
import { FloorplanModule } from './floorplan/floorplan.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite' as any,
      database: 'db.sqlite',
      autoLoadEntities: true,
      synchronize: true, // Only for development
    }),
    OrdersModule, 
    AuthModule,
    MenuModule,
    FloorplanModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
