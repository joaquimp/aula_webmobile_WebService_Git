import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateComputerDto {
  @ApiProperty({
    description: 'Processador do Computador',
    required: true
  })
  @IsNotEmpty()
  processor: string;


  @ApiProperty({
    description: 'Memoria do computador',
    required: true
  })
  @IsNotEmpty()
  memory: string;
}