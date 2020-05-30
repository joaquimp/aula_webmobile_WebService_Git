import { Controller, Get, Post, Body, Param, UsePipes, ValidationPipe, ParseIntPipe, Query, Put, Delete } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';

@Controller('tasks')
export class TaskController {
    constructor(private taskService: TaskService) {}

    @Get()
    async getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Promise<Task[]> {
        return await this.taskService.getTasks(filterDto);
    }

    @Get('/:id')
    async getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return await this.taskService.getById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return await this.taskService.createTask(createTaskDto);
    }

    @Put('/:id')
    @UsePipes(ValidationPipe)
    async updateTask(
        @Body() createTaskDto: CreateTaskDto,
        @Param('id') id: number
    ): Promise<Task> {
        return await this.taskService.updateTask(id, createTaskDto);
    }

    @Delete('/:id')
    async deleteTask(@Param('id') id: number): Promise<Task> {
        return await this.taskService.deleteTask(id);
    }
}
