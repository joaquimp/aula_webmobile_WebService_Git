import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({name:'car'})
export class Car extends BaseEntity{
    
    @PrimaryGeneratedColumn({name:'id'})
    id: number;

    @Column({name:'brand'})
    brand: string;

    @Column({name:'model'})
    model: string;

    @Column({name:'year'})
    year: number;

} 