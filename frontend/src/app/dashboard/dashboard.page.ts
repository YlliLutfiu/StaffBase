import { Component, inject, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { DepartmentService } from '../services/department.service';
import { SalaryService } from '../services/salary.service';
import { TasksService } from '../services/task.service';
import { TaskStatus } from '../models/task-status.enum';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.page.html',
  styleUrl: './dashboard.page.scss'
}) 
export class DashboardPage implements OnInit {
  totalEmployees: number = 0;
  totalDepartments: number = 0;
  totalSalary: number = 0;
  totalInProgressTasks: number = 0;
  totalTasks: number = 0;

  private employeeService = inject(EmployeeService);
  private departmentService = inject(DepartmentService);
  private salaryService = inject(SalaryService);
  private tasksService = inject(TasksService);

  ngOnInit(): void {
    this.loadTotalEmployees();
    this.loadTotalDepartments();
    this.loadTotalSalary();
    this.loadTotalInProgressTasks();
    this.loadTotalTasks();
  }

  loadTotalEmployees(): void {
    this.employeeService.getEmployees().subscribe((response) => {
      this.totalEmployees = response.length;
    });
  }

  loadTotalDepartments(): void {
    this.departmentService.getDepartments().subscribe((response) => {
      this.totalDepartments = response.length;
    });
  }

  loadTotalSalary(): void {
    this.salaryService.getSalary().subscribe((response) => {
      this.totalSalary = response.reduce((sum, salary) => sum + +salary.salary_amount, 0);
    });
  }

  loadTotalInProgressTasks(): void {
    this.tasksService.getTasks().subscribe((response) => {
      this.totalInProgressTasks = response.filter(
        (task) => task.task_status === TaskStatus.InProgress
      ).length;
    });
  }

  loadTotalTasks(): void {
    this.tasksService.getTasks().subscribe((response) => {
      this.totalTasks = response.length;
    });
  }
}
