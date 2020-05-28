import { Controller, Get, Post, Body, Param, UsePipes, ValidationPipe, ParseIntPipe, Query, NotFoundException, Put, Logger, Delete } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@Controller('tasks')
export class TaskController {
    constructor(private taskService: TaskService) { }

    @Get()
    @ApiOperation({ summary: 'Get all Tasks', description: 'buscas todas as tarefas cadastradas no banco de dados' })
    @ApiResponse({ status: 200, description: 'ok', type: Task, isArray: true })
    async getTasks(@Query('completed') completed): Promise<Task[]> {
        if (completed) {
            completed = completed.toLowerCase() === 'true';
            return await this.taskService.getIsComplete(completed);
        }
        return await this.taskService.getTasks();
    }


    @Get('/:id')
    @ApiOperation({ summary: 'Get specific Task', description: 'buscas uma tarefas cujo ID seja igual ao informado na requisição' })
    @ApiResponse({ status: 200, description: 'ok', type: Task, isArray: false })
    @ApiResponse({ status: 404, description: 'Not Found' })
    async getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return await this.taskService.getById(id);
    }

    @Put('/:id')
    @ApiOperation({ summary: 'Update a task by ID', description: 'atualiza a task que coincidir com a ID passada no parâmetro' })
    async updateTaskById(@Body() updateTask: CreateTaskDto, @Param('id') id): Promise<Task> {
        return await this.taskService.updateTaskById(updateTask, id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    @ApiOperation({ summary: 'Create a Task', description: 'cria uma nova tarefa e registra no banco de dados' })
    @ApiResponse({ status: 200, description: 'ok', type: Task, isArray: false })
    async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return await this.taskService.createTask(createTaskDto);
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a Task', description: 'deleta uma tarefa do banco de dados' })
    async deleteTask(@Param('id') id) {
        return await this.taskService.deleteTask(id);
    }
}
