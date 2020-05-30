import { Car } from './car.entity';
import { GetCarFilterDto } from './dto/filter-car.dto';
import { CarService } from './car.service';
import { Controller, Get, ValidationPipe, Query } from '@nestjs/common';

@Controller('car')
export class CarController {
    constructor(private carService: CarService) {}

    @Get()
    async getCars(@Query(ValidationPipe) filterDto: GetCarFilterDto): Promise<Car[]> {
        return await this.carService.getCars(filterDto);
    }
}
