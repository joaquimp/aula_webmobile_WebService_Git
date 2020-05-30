import { Repository, EntityRepository } from "typeorm";
import { Task } from "./task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";
import { GetTasksFilterDto } from "./dto/get-task-filter.dto";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

    async getTask(filterDto: GetTasksFilterDto): Promise<Task[]> {
        const { status, search, completed } = filterDto;
        const query = this.createQueryBuilder('task');

        if (status) {
            query.andWhere('task.status = :status', {status});
        }

        if (search) {
            query.andWhere('task.title LIKE :search OR task.description LIKE :search', {search: `%${search}%`}); 
        }

        if (completed) {
            query.andWhere('task.completed = :completed', {completed: completed});
        }

        const tasks = await query.getMany();
        return tasks;
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const task = new Task();
        task.title = createTaskDto.title;
        task.description = createTaskDto.description;
        task.status = TaskStatus.OPEN;
        await task.save();
        
        return task;
    }

}