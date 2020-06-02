import { Module } from '@nestjs/common';
import { ComputerService } from './computer.service';
import { ComputerController } from './computer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComputerRepository } from './computer.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ComputerRepository]),
  ],
  controllers: [ComputerController],
  providers: [ComputerService]
})
export class ComputerModule {}
