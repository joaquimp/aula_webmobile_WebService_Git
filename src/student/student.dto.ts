import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class StudentDTO {
    @ApiProperty({
        description: 'Nome do estudante',
        required: true
    })
    @IsNotEmpty()
    name: string;


    @ApiProperty({
        description: 'Curso do estudante',
        required: true
    })
    @IsNotEmpty()
    course: string;
}