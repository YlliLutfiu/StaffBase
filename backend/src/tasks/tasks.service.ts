import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './tasks.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async findAll(): Promise<Task[]> {
    return this.taskRepository.find({
      order: {
        task_id: 'DESC',
      },
    });
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ task_id: id });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async create(task: Task): Promise<Task> {
    return await this.taskRepository.save(task);
  }

  async update(id: number, task: Task): Promise<Task> {
    const taskToUpdate = await this.findOne(id);
    taskToUpdate.task_name = task.task_name;
    taskToUpdate.task_description = task.task_description;
    taskToUpdate.task_employee = task.task_employee;
    taskToUpdate.task_deadline = task.task_deadline;
    taskToUpdate.task_status = task.task_status;
    return await this.taskRepository.save(taskToUpdate);
  }

  async remove(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }
}
