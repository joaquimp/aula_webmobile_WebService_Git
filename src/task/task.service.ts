import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity'
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { DeleteResult } from 'typeorm';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ) {}

    async getTasks(completed: boolean): Promise<Task[]> {
        return this.taskRepository.getTask(completed);
    }

    async getById(id: number): Promise<Task> {
        const found = await this.taskRepository.findOne(id);

        if (!found) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }

        return found;
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto);
    }

    async updateTask(idTask, createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskRepository.updateTask(idTask, createTaskDto);
    }

    async deleteTaskById(idTask: number): Promise<number> {
        return this.taskRepository.deleteTaskById(idTask);
    }
    


}
