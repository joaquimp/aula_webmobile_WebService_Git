import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ComputerModule } from './computer/computer.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig),TaskModule, ComputerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
 