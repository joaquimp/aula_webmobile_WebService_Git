import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { CarModule } from './car/car.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig),TaskModule, CarModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
 