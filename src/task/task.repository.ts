import { Repository, EntityRepository,  } from "typeorm";
import { Task } from "./task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";
import { GetTasksFilterDto } from "./dto/get-task-filter.dto";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

    async getTask(completed: boolean): Promise<Task[]> {
        
        const query = this.createQueryBuilder('task');
        if(completed == true){
            query.where("status = :type", { type: 'DONE' });
        } else {
            query.where("status != :type", { type: 'DONE' });
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

    async updateTask(id: number, createTaskDto: CreateTaskDto): Promise<Task> {
        const query = this.createQueryBuilder('task')
        .update(createTaskDto).where('id = :id', {id: id});

        await query.execute();
        return this.findOne(id);
    }

    async deleteTask(id: number): Promise<number> {
        const query = this.createQueryBuilder('task')
        .delete().where('id = :id', {id: id});
        
        return (await query.execute()).affected;
    }

}