import { Injectable } from '@nestjs/common';
import { CarRepository } from './car.repostory';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from './car.entity';
import { CreateCarDto } from './dto/create-car.dto';

@Injectable()
export class CarService {

    constructor(
        @InjectRepository(CarRepository)
        private carRepository: CarRepository
    ) {}

    async getCar() : Promise<Car[]>{
        return this.carRepository.getCar();
    }

    async createCar(createCarDto: CreateCarDto) : Promise<Car>{
        return this.carRepository.createCar(createCarDto);
    }

    async updateCar(idCar: number, createCarDto: CreateCarDto): Promise<Car> {
        return this.carRepository.updateCar(idCar, createCarDto);
    }

    async deleteTaskById(idCar: number): Promise<number> {
        return this.carRepository.deleteTaskById(idCar);
    }
}
