import { Controller, Get, Post, Body, Put, ParseIntPipe, Param, Delete } from '@nestjs/common';
import { CarService } from './car.service';
import { Car } from './car.entity';
import { CreateCarDto } from './dto/create-car.dto';

@Controller('car')
export class CarController {

    constructor(private carService: CarService) {}

    @Get()
    async getCar(): Promise<Car[]> {
        return await this.carService.getCar();
    }

    @Post()
    async createCar(@Body() createCarDto: CreateCarDto): Promise<Car> {
        return await this.carService.createCar(createCarDto);
    }

    @Put(':id')
    async updateCar(@Param('id', ParseIntPipe) idCar: number, @Body() createCarDto: CreateCarDto): Promise<Car>{
        return this.carService.updateCar(idCar, createCarDto);
    }
    
    @Delete(':id')
    async deleteTask(@Param('id', ParseIntPipe) idCar: number): Promise<number>{
        return this.carService.deleteTaskById(idCar);
    }

}
