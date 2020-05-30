import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Computer } from './computer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ComputerService { 
    constructor(
        @InjectRepository(Computer)
        private computerRepository: Repository<Computer>
    ) { }

    public async create(newComputer: Computer): Promise<Computer> {
        return await this.computerRepository.save(newComputer);
    }

    public async readAll(): Promise<Computer[]> {
        return await this.computerRepository.find();
    }

    public async readOne(queryId: number): Promise<Computer> {
        return await this.computerRepository.findOne(queryId);
    }

    public async update(id: number, payloadUpdate: Computer) {
        await this.computerRepository.update(id, payloadUpdate);
        return await this.computerRepository.findOne(id);
    }

    public async delete(id: number) {
        return await this.computerRepository.delete(id);
    }
}
