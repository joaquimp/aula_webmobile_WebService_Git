import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { TaskStatus } from "./task-status.enum";

@Entity({name:'task'})
export class Task extends BaseEntity{
    @PrimaryGeneratedColumn({name:'id'})
    id: number;

    @Column({name:'title'})
    title: string;

    @Column({name:'description'})
    description: string;

    @Column({name:'status'})
    status: TaskStatus;

    @Column({ default: false, name: 'completed', type: 'tinyint' })
    completed: boolean;
} 