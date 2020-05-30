import { CarRepository } from './car.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CarController } from './car.controller';
import { CarService } from './car.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CarRepository]),
  ],
  controllers: [CarController],
  providers: [CarService]
})
export class CarModule {}
