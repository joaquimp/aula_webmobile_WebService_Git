import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Computer extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    processor: string;

    @Column()
    memory: string;
} 