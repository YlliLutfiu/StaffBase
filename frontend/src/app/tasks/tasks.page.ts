import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TasksService } from '../services/task.service';
import { TasksDTO } from '../models/tasks.dto';
import { EmployeeService } from '../services/employee.service';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    CommonModule,
    NgxPaginationModule
  ],
  templateUrl: './tasks.page.html',
  styleUrl: './tasks.page.scss'
})
export class TasksPage implements OnInit {
  tasks: TasksDTO[] = [];
  private router = inject(Router);
  private tasksService = inject(TasksService);
  private employeeService = inject(EmployeeService);
  p: number = 1;

  isModalOpen: boolean = false;
  taskToDelete: TasksDTO | null = null;

    openDeleteModal(task: TasksDTO): void {
      this.taskToDelete = task;
      this.isModalOpen = true;
    }
  
    onCancelDelete(): void {
      this.isModalOpen = false;
      this.taskToDelete = null;
    }
  
    onConfirmDelete(): void {
      if (this.taskToDelete) {
        this.tasksService.deleteTask(this.taskToDelete.task_id).subscribe({
          next: () => {
            console.log('Task deleted successfully.');
            this.loadTasks();
          },
          error: (err) => {
            console.error('Error deleting task:', err);
          },
        });
      }
      this.isModalOpen = false;
      this.taskToDelete = null;
    }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.tasksService.getTasks().subscribe(
      (response) => {
        this.tasks = response;
        this.fetchEmployeeNames();
      },
      (error) => {
        console.error('Error fetching tasks:', error);
      }
    );
  }

  fetchEmployeeNames(): void {
    const requests = this.tasks.map((task) =>
      this.employeeService.getEmployeeById(task.task_employee)
    );

    forkJoin(requests).subscribe((responses) => {
      responses.forEach((employee, index) => {
        this.tasks[index].task_employee_name = employee.employee_name;
      });
    });
  }

  sendToCreateTask() {
    this.router.navigate(['/create-task'])
  }

  openEditModal(taskId: number): void {
    this.router.navigate(['/create-task', taskId]);
  }
}
