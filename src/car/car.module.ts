import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarRepository } from './car.repostory';
import { CarController } from './car.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([CarRepository]),
  ],
  controllers: [CarController],
  providers: [CarService]
})
export class CarModule {}
