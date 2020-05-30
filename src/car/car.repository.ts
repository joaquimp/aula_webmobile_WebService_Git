import { GetCarFilterDto } from './dto/filter-car.dto';
import { Car } from './car.entity';
import { Repository, EntityRepository } from "typeorm";

@EntityRepository(Car)
export class CarRepository extends Repository<Car> {

    async getCars(filterDto: GetCarFilterDto): Promise<Car[]> {
        const { brand, model, year } = filterDto;
        const query = this.createQueryBuilder('car');

        if (brand) {
            query.andWhere('car.brand = :brand', {brand});
        }

        if (model) {
            query.andWhere('car.model = :model', {model});
        }

        if (year) {
            query.andWhere('car.year = :year', {year});
        }


        const cars = await query.getMany();
        return cars;
    }

}