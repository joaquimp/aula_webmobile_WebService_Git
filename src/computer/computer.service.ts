import { Injectable, NotFoundException } from '@nestjs/common';
import { ComputerRepository } from './computer.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Computer } from './computer.entity'
import { CreateComputerDto } from './dto/create-computer.dto';

@Injectable()
export class ComputerService {
    constructor(
        @InjectRepository(ComputerRepository)
        private computerRepository: ComputerRepository
    ) {}

    async getComputers(completed: boolean): Promise<Computer[]> {
        return this.computerRepository.getComputer(completed);
    }

    async getById(id: number): Promise<Computer> {
        const found = await this.computerRepository.findOne(id);

        if (!found) {
            throw new NotFoundException(`Computer with ID "${id}" not found`);
        }

        return found;
    }

    async createComputer(createComputerDto: CreateComputerDto): Promise<Computer> {
        return this.computerRepository.createComputer(createComputerDto);
    }
    async putById(id: number, createComputerDto: CreateComputerDto): Promise<Computer> {
        const found = await this.computerRepository.findOne(id);
        if (!found) {
            throw new NotFoundException(`Computer with ID "${id}" not found`);
        }

        return this.computerRepository.putComputer(createComputerDto, id);
    }

    async deleteById(id: number): Promise<number> {
        const found = await this.computerRepository.findOne(id);
        if (!found) {
            throw new NotFoundException(`Computer with ID "${id}" not found`);
        }

        return this.computerRepository.deleteComputer(id);
    }
}
