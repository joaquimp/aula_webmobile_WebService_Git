import { IsOptional } from 'class-validator';

export class GetCarFilterDto {

    @IsOptional()
    brand: string;

    @IsOptional()
    model: string;

    @IsOptional()
    year: number;

}