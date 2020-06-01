import { Repository, EntityRepository } from "typeorm";
import { Task } from "./task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";
import { GetTasksFilterDto } from "./dto/get-task-filter.dto";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

    async getTask(completed: boolean): Promise<Task[]> {
        const query = this.createQueryBuilder('task');
        if (completed == true) {
             query.where('status = :progresso', {progresso: 'COMPLETED'});
        }else {
            query.where('status != :progresso', {progresso: 'COMPLETED'});
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

    async putTask(createTaskDto: CreateTaskDto, id: number): Promise<Task> {
        const query = this.createQueryBuilder('task');
        query.update(createTaskDto).where('id = :codigo', {codigo: id});
        
        await query.execute();
        return this.findOne(id);
    }

    async deleteTask(id: number): Promise<number> {
        const query = this.createQueryBuilder('task');
        query.delete();
        return (await query.execute()).affected;
    }
}