import { Repository, EntityRepository } from "typeorm";
import { Task } from "./task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";
import { GetTasksFilterDto } from "./dto/get-task-filter.dto";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

    async getTask(completed: string): Promise<Task[]> {
        var statusToSearch = TaskStatus.DONE;

        const query = this.createQueryBuilder('task');

        if (completed == null) {
            const tasks = await query.getMany();
            return tasks;
        }
        
        var bool_completed = (completed == "true");

        if (bool_completed == true){
            const tasks = await query.where('task.status = :status', { status : statusToSearch}).getMany();
            console.log('true')
            return tasks;
        } else if (bool_completed == false) {
            const tasks = await query.where('task.status != :status', { status : statusToSearch}).getMany();
            console.log('false')
            return tasks;
        }
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