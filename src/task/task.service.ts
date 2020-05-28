import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity'
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ) { }

    async getIsComplete(completed: Boolean) { //Promise<Task[]>
        if (completed === true) {
            return await this.taskRepository.find({ where: { status: 'DONE' } });
        } else {
            return await this.taskRepository.find({ where: { status: 'OPEN' } });
        }
    }

    async getTasks(): Promise<Task[]> {
        return this.taskRepository.getTask();
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

    async updateTaskById(updateTask: CreateTaskDto, id): Promise<Task> {
        this.taskRepository.update({ id: id }, updateTask);
        return await this.taskRepository.findOne({ id: id });
    }

    async deleteTask(id) {
        if (this.taskRepository.hasId(id)) {
            await this.taskRepository.delete({ id });
            return { deleted: true }
        }
        return { deleted: false };
    }
}
