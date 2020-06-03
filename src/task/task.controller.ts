import { Controller, Get, Post, Body, Param, UsePipes, ValidationPipe, ParseIntPipe, Query, NotFoundException, ParseBoolPipe, Put, Delete } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm'

@Controller('tasks')
export class TaskController {
    constructor(private taskService: TaskService) {}

    @Get()
    @ApiOperation({ summary: 'Get all Tasks', description: 'buscas todas as tarefas cadastradas no banco de dados'})
    @ApiResponse({ status: 200, description: 'ok', type: Task, isArray: true })
    async getTasks(@Query('completed', ParseBoolPipe) completed): Promise<Task[]> {
        return await this.taskService.getTasks(completed);
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get specific Task', description: 'buscas uma tarefas cujo ID seja igual ao informado na requisição' })
    @ApiResponse({ status: 200, description: 'ok', type: Task, isArray: false })
    @ApiResponse({ status: 404, description: 'Not Found' })
    async getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return await this.taskService.getById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    @ApiOperation({ summary: 'Create a Task', description: 'cria uma nova tarefa e registra no banco de dados' })
    @ApiResponse({ status: 200, description: 'ok', type: Task, isArray: false })
    async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return await this.taskService.createTask(createTaskDto);
    }

    @Put('/:id')
    @ApiOperation({ summary: 'Update a specific task', description: 'Atualiza um tarefa específica pelo ID' })
    @ApiResponse({ status: 200, description: 'ok', type: Task, isArray: false })
    @ApiResponse({ status: 404, description: 'Not Found' })
    async updateTask(@Param('id', ParseIntPipe) id: number, @Body() createTaskDto: CreateTaskDto): Promise<Task>{
        return this.taskService.updateTask(id, createTaskDto);
    }
      
    @Delete(':id')
    @ApiOperation({ summary: 'Delete a specific task', description: 'Deleta tarefa pelo ID' })
    @ApiResponse({ status: 200, description: 'ok', type: Task, isArray: false })
    @ApiResponse({ status: 404, description: 'Not Found' })
    async deleteTask(@Param('id', ParseIntPipe) id: number): Promise<number>{
        return this.taskService.deleteTask(id);
    }

    
}
