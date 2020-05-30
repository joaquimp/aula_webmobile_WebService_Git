import { Module } from '@nestjs/common';
import { ComputerService } from './computer.service';
import { ComputerController } from './computer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Computer } from './computer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Computer]),
  ],
  providers: [ComputerService],
  controllers: [ComputerController]
})
export class ComputerModule {}
