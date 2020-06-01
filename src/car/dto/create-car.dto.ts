import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCarDto {
    
    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    brand: string;

    @IsNotEmpty()
    model: string;

    @IsNotEmpty()
    year:string;

}