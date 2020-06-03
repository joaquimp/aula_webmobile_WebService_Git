import { Controller, Get, Post, Body, Param, UsePipes, ValidationPipe, ParseIntPipe, Query, NotFoundException, ParseBoolPipe, Put, Delete } from '@nestjs/common';
import { ComputerService } from './computer.service';
import { Computer } from './computer.entity';
import { CreateComputerDto } from './dto/create-computer.dto';
import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { promises } from 'dns';

@Controller('computers')
export class ComputerController {
  constructor(private computerService: ComputerService) {}

  @Get()
  @ApiOperation({ summary: 'Get all computers', description: 'Get all computers'})
  @ApiResponse({ status: 200, description: 'ok', type: Computer, isArray: true })
  async getComputers(@Query('completed', ParseBoolPipe) completed): Promise<Computer[]> {
    return await this.computerService.getComputers(completed);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get a specific computer', description: 'Get computer ID' })
  @ApiResponse({ status: 200, description: 'ok', type: Computer, isArray: false })
  @ApiResponse({ status: 404, description: 'Not Found' })
  async getComputerById(@Param('id', ParseIntPipe) id: number): Promise<Computer> {
    return await this.computerService.getById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  @ApiOperation({ summary: 'Create a new computer', description: 'Create a new computer' })
  @ApiResponse({ status: 200, description: 'ok', type: Computer, isArray: false })
  async createComputer(@Body() createComputerDto: CreateComputerDto): Promise<Computer> {
    return await this.computerService.createComputer(createComputerDto);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update a specific computer', description: 'Update computer by ID' })
  @ApiResponse({ status: 200, description: 'ok', type: Computer, isArray: false })
  @ApiResponse({ status: 404, description: 'Not Found' })
  async putComputer(@Param('id', ParseIntPipe) id: number, @Body() createComputerDto: CreateComputerDto): Promise<Computer> {
    return await this.computerService.putById(id, createComputerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific computer', description: 'Delete computer by ID' })
  @ApiResponse({ status: 200, description: 'ok', type: Number, isArray: false })
  @ApiResponse({ status: 404, description: 'Not Found' })
  async deleteComputer(@Param('id', ParseIntPipe) id: number): Promise<number> {
    return await this.computerService.deleteById(id);
  }
}