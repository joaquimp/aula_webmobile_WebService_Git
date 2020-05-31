import { BaseEntity, Entity, BeforeInsert, PrimaryGeneratedColumn, Column } from "typeorm";
import * as crypto from 'crypto';

@Entity()
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @BeforeInsert()
    hashPassword() {
      this.password = crypto.createHmac('sha256', this.password).digest('hex');
    }
    @Column()
    password: string;
} 