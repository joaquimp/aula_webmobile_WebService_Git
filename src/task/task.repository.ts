import { Repository, EntityRepository, DeleteResult } from "typeorm";
import { Task } from "./task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";
import { GetTasksFilterDto } from "./dto/get-task-filter.dto";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

    async getTask(completed: boolean): Promise<Task[]> {
        
        const query = this.createQueryBuilder('task');
        if(completed){
            query.where("status = :tipo", { tipo: 'DONE' });
        } else {
            query.where("status != :tipo", { tipo: 'DONE' });
        }
        const tasks = await query.getMany();
        return tasks;
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const task = new Task();
        task.title = createTaskDto.title;
        task.description = createTaskDto.description;
        task.status = TaskStatus.DONE;
        await task.save();
        
        return task;
    }

    async updateTask(idTask: number, createTaskDto: CreateTaskDto): Promise<Task>{       
        const query = this.createQueryBuilder("task")
        .update(createTaskDto)
        .where("id = :id", { id: idTask });
        await query.execute();

        return this.findOne(idTask);          
    }

    async deleteTaskById(idTask: number): Promise<number>{
        const query = this.createQueryBuilder("task")      
        .delete()
        .where("id = :id", { id: idTask });
        return (await query.execute()).affected;        
    }     


}