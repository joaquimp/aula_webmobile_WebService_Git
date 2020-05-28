import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity'
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { UpdateResult, DeleteResult } from 'typeorm';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ) {}

    async getTasks(q: object): Promise<Task[]> {;
        return this.taskRepository.getTask(q["completed"]);
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

    async updateTask(taskUpdate: Task): Promise<UpdateResult> {
        return await this.taskRepository.update(taskUpdate.id, taskUpdate);
    }

    async deleteTask(id: number): Promise<DeleteResult> {
        return await this.taskRepository.delete(id = id);
    }
}
