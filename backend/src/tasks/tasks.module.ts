import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks.entity';
import { TaskService } from './tasks.service';
import { TaskController } from './tasks.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  providers: [TaskService],
  controllers: [TaskController],
})
export class TaskModule {}