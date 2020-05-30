import { Controller, Get, Post, Put, Param, Body, Delete } from '@nestjs/common';
import { ComputerService } from './computer.service';
import { Computer } from './computer.entity';
import { DeleteResult } from 'typeorm';

@Controller('computer')
export class ComputerController {
    constructor(
        private computerService: ComputerService
    ){ }

    @Get()
    public async get(): Promise<Computer[]>{
        return await this.computerService.readAll();
    }

    @Get(':id')
    public async getOne(@Param('id') id: number): Promise<Computer> {
        return await this.computerService.readOne(id);
    }

    @Post()
    public async post(@Body() newComputer: Computer): Promise<Computer> {
        return await this.computerService.create(newComputer);
    }

    @Put(':id')
    public async put(@Param('id') id: number, @Body() payloadUpdate: Computer): Promise<Computer> {
        return await this.computerService.update(id, payloadUpdate);
    }

    @Delete(':id')
    public async delete(@Param('id') id: number): Promise<DeleteResult> {
        return await this.computerService.delete(id);
    }
}
