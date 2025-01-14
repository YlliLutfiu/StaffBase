import { Component, inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TasksDTO } from '../models/tasks.dto';
import { EmployeeDTO } from '../models/employee.dto';
import { TasksService } from '../services/task.service';
import { EmployeeService } from '../services/employee.service';
import { TaskStatus } from './../models/task-status.enum';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-task.page.html',
  styleUrls: ['./create-task.page.scss'],
})
export class CreateTaskPage implements OnInit {
  public taskObj: TasksDTO = {
    task_id: 0,
    task_name: '',
    task_description: '',
    task_employee: 0,
    task_deadline: new Date(),
    task_status: TaskStatus.InProgress,
  };

  public employees: EmployeeDTO[] = [];
  taskStatuses = Object.values(TaskStatus);
  public isEditMode: boolean = false;
  private taskId: number = 0;

  private tasksService = inject(TasksService);
  private employeeService = inject(EmployeeService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.loadEmployees();
    this.activatedRoute.paramMap.subscribe((params) => {
      const taskId = params.get('taskId');
      if (taskId) {
        this.isEditMode = true;
        this.taskId = +taskId;
        this.loadTask(taskId);
      }
    });
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (response) => {
        this.employees = response;
      },
      error: (err) => {
        console.error('Error loading employees:', err);
      },
    });
  }

  loadTask(taskId: string): void {
    this.tasksService.getTaskById(+taskId).subscribe({
      next: (task) => {
        this.taskObj = { ...task };
      },
      error: (err) => {
        console.error('Error loading task:', err);
      },
    });
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.tasksService.updateTask(this.taskId, this.taskObj).subscribe({
        next: () => {
          this.onCancel();
        },
        error: (err) => {
          console.error('Error updating task:', err);
        },
      });
    } else {
      this.tasksService.createTask(this.taskObj).subscribe({
        next: () => {
          this.resetForm();
          this.onCancel();
        },
        error: (err) => {
          console.error('Error creating task:', err);
        },
      });
    }
  }

  resetForm(): void {
    this.taskObj = {
      task_id: 0,
      task_name: '',
      task_description: '',
      task_employee: 0,
      task_deadline: new Date(),
      task_status: TaskStatus.InProgress,
    };
  }

  onCancel(): void {
    this.router.navigate(['/tasks']);
  }
}
