import { Controller, Get, Post, Body, Param, UsePipes, ValidationPipe, ParseIntPipe, Query, NotFoundException, Put, Delete, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { UpdateResult, DeleteResult } from 'typeorm';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('tasks')
export class TaskController {
    constructor(private taskService: TaskService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    @ApiOperation({ summary: 'Get all Tasks', description: 'buscas todas as tarefas cadastradas no banco de dados'})
    @ApiResponse({ status: 200, description: 'ok', type: Task, isArray: true })
    async getTasks(@Query() q): Promise<Task[]> {
        return await this.taskService.getTasks(q);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    @ApiOperation({ summary: 'Get specific Task', description: 'buscas uma tarefas cujo ID seja igual ao informado na requisição' })
    @ApiResponse({ status: 200, description: 'ok', type: Task, isArray: false })
    @ApiResponse({ status: 404, description: 'Not Found' })
    async getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return await this.taskService.getById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    @UsePipes(ValidationPipe)
    @ApiOperation({ summary: 'Create a Task', description: 'cria uma nova tarefa e registra no banco de dados' })
    @ApiResponse({ status: 200, description: 'ok', type: Task, isArray: false })
    async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return await this.taskService.createTask(createTaskDto);
    }

    @UseGuards(JwtAuthGuard)
    @Put('/:id')
    @UsePipes(ValidationPipe)
    @ApiOperation({ summary: 'Update a Task', description: 'Altera uma tarefa e registra no banco de dados' })
    @ApiResponse({ status: 200, description: 'ok', type: Task, isArray: false })
    async updateTask(@Body() taskUpdate: UpdateTaskDto, @Param('id') id: number): Promise<UpdateResult> {
        return await this.taskService.updateTask(id, taskUpdate);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a Task', description: 'Deleta uma tarefa do banco de dados' })
    @ApiResponse({ status: 200, description: 'ok', type: Task, isArray: false })
    async deleteTask(@Param('id') id: number): Promise<DeleteResult> {
        return await this.taskService.deleteTask(id);
    }

}
