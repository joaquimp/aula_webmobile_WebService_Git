import { Repository, EntityRepository } from "typeorm";
import { Car } from "./car.entity";
import { CreateCarDto } from "./dto/create-car.dto";

@EntityRepository(Car)
export class CarRepository extends Repository<Car> {

    async getCar(): Promise<Car[]>{
        const query = this.createQueryBuilder('car');
        const cars = await query.getMany();
        return cars;
    }

    async createCar(createCarDto: CreateCarDto): Promise<Car> {
        const car = new Car();
        car.brand = createCarDto.brand;
        car.model = createCarDto.model;
        car.year = createCarDto.year;
        await car.save();        
        return car;
    }

    async updateCar(idCar: number, createCarDto: CreateCarDto): Promise<Car>{       
        const query = this.createQueryBuilder("car")
        .update(createCarDto)
        .where("id = :id", { id: idCar });
        await query.execute();

        return this.findOne(idCar);          
    }

    async deleteTaskById(idCar: number): Promise<number>{
        const query = this.createQueryBuilder("car")      
        .delete()
        .where("id = :id", { id: idCar });
        return (await query.execute()).affected;        
    }  

}