import { GetCarFilterDto } from './dto/filter-car.dto';
import { CarRepository } from './car.repository';
import { Car } from './car.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CarService {
    constructor(
        @InjectRepository(CarRepository)
        private carRepository: CarRepository
    ) {}

    async getCars(filterDto: GetCarFilterDto): Promise<Car[]> {
        return this.carRepository.getCars(filterDto);
    }
}
