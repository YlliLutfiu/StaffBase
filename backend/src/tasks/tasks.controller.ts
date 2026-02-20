import { Controller, Get, Post, Param, Body, Put, Delete, NotFoundException, Req, UseGuards } from '@nestjs/common';
import { TaskService } from './tasks.service';
import { Task } from './tasks.entity';
import { TaskDTO } from './tasks.dto';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';

@UseGuards(AuthGuard('jwt'))
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async findAll(@Req() req): Promise<TaskDTO[]> {
    const userId = req.user.userId;
    const tasks = await this.taskService.findAll(userId);
    return tasks.map(task => this.toDTO(task));
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<TaskDTO> {
    const task = await this.taskService.findOne(id);
    return this.toDTO(task);
  }

  @Post()
  async create(@Body() taskDTO: TaskDTO, @Req() req): Promise<TaskDTO> {
    const task = this.fromDTO(taskDTO);
    task.userId = req.user.userId;
    const newTask = await this.taskService.create(task);
    return this.toDTO(newTask);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() taskDTO: TaskDTO): Promise<TaskDTO> {
    const existingTask = await this.taskService.findOne(id);
    if (!existingTask) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    const updatedTask = await this.taskService.update(id, this.fromDTO(taskDTO));
    return this.toDTO(updatedTask);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<{ message: string }> {
    await this.taskService.remove(id);
    return { message: `Task with ID ${id} deleted successfully` };
  }

  private toDTO(task: Task): TaskDTO {
    return {
      task_id: task.task_id,
      task_name: task.task_name,
      task_description: task.task_description,
      task_employee: task.task_employee,
      task_deadline: task.task_deadline,
      task_status: task.task_status,
      userId: task.userId,
    };
  }

  private fromDTO(taskDTO: TaskDTO): Task {
    return {
      task_id: taskDTO.task_id,
      task_name: taskDTO.task_name,
      task_description: taskDTO.task_description,
      task_employee: taskDTO.task_employee,
      task_deadline: taskDTO.task_deadline,
      task_status: taskDTO.task_status,
      userId: taskDTO.userId,
    } as Task;
  }
}