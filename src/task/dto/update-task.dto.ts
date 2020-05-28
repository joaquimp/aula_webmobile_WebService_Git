import { IsNotEmpty, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '../task-status.enum';

export class UpdateTaskDto {
    @ApiProperty({
        description: 'Título da tarefa',
        required: true
    })
    @IsNotEmpty()
    title: string;

    @ApiProperty({
        description: 'Descrição da tarefa',
        required: true
    })
    @IsNotEmpty()
    description: string;

    @ApiProperty({
        description: 'Status da tarefa',
        required: true
    })
    @IsNotEmpty()
    @IsEnum(TaskStatus)
    status: TaskStatus;
}