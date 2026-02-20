import { Component, inject, OnInit, AfterViewInit } from "@angular/core";
import { EmployeeService } from "../services/employee.service";
import { DepartmentService } from "../services/department.service";
import { SalaryService } from "../services/salary.service";
import { TasksService } from "../services/task.service";
import { TaskStatus } from "../models/task-status.enum";
import { Chart, registerables } from "chart.js";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [],
  templateUrl: "./dashboard.page.html",
  styleUrl: "./dashboard.page.scss",
})
export class DashboardPage implements OnInit, AfterViewInit {
  totalEmployees: number = 0;
  totalDepartments: number = 0;
  totalSalary: number = 0;
  totalInProgressTasks: number = 0;
  totalTasks: number = 0;

  private employeeService = inject(EmployeeService);
  private departmentService = inject(DepartmentService);
  private salaryService = inject(SalaryService);
  private tasksService = inject(TasksService);

  employeesChart: any;
  tasksPieChart: any;

  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.loadTotals();
  }

  ngAfterViewInit(): void {
    this.createEmployeesChart();
    this.createTasksPieChart();
  }

  loadTotals(): void {
    this.employeeService.getEmployees().subscribe((employees) => {
      this.totalEmployees = employees.length;
      this.createEmployeesChart();
    });

    this.departmentService.getDepartments().subscribe((departments) => {
      this.totalDepartments = departments.length;
    });

    this.salaryService.getSalary().subscribe((salaries) => {
      this.totalSalary = salaries.reduce((sum, s) => sum + +s.salary_amount, 0);
    });

    this.tasksService.getTasks().subscribe((tasks) => {
      this.totalTasks = tasks.length;
      this.totalInProgressTasks = tasks.filter(
        (task) => task.task_status === TaskStatus.InProgress
      ).length;
    });
  }

  createEmployeesChart(): void {
    const ctx: any = document.getElementById("employeesChart");
    if (!ctx) return;

    this.employeeService.getEmployees().subscribe((employees) => {
      this.departmentService.getDepartments().subscribe((departments) => {
        const labels = departments.map((d) => d.department_name);

        const data = departments.map(
          (d) =>
            employees.filter(
              (emp) => emp.employee_department === d.department_name
            ).length
        );

        if (this.employeesChart) {
          this.employeesChart.destroy();
        }

        this.employeesChart = new Chart(ctx, {
          type: "bar",
          data: {
            labels,
            datasets: [
              {
                label: "Employees per Department",
                data,
                backgroundColor: "rgba(54, 162, 235, 0.6)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      });
    });
  }
  createTasksPieChart(): void {
    const ctx: any = document.getElementById('tasksPieChart');
    if (!ctx) return;
  
    this.tasksService.getTasks().subscribe((tasks) => {
      const statusCounts = {
        InProgress: tasks.filter(t => t.task_status === TaskStatus.InProgress).length,
        Completed: tasks.filter(t => t.task_status === TaskStatus.Completed).length,
        Cancelled: tasks.filter(t => t.task_status === TaskStatus.Cancelled).length,
        Postponed: tasks.filter(t => t.task_status === TaskStatus.Postponed).length,
      };

      if (this.tasksPieChart) {
        this.tasksPieChart.destroy();
      }
  
      this.tasksPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['In Progress', 'Completed', 'Cancelled', 'Postponed'],
          datasets: [{
            data: [
              statusCounts.InProgress,
              statusCounts.Completed,
              statusCounts.Cancelled,
              statusCounts.Postponed
            ],
            backgroundColor: [
              'rgba(54, 162, 235, 0.7)',
              'rgba(75, 192, 192, 0.7)',
              'rgba(255, 99, 132, 0.7)',
              'rgba(255, 206, 86, 0.7)'
            ],
            borderColor: [
              'rgba(54, 162, 235, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom'
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  const label = context.label || '';
                  const total = tasks.length;
                  const value = context.raw as number;
                  const percentage = ((value / total) * 100).toFixed(1);
                  return `${label}: ${value} (${percentage}%)`;
                }
              }
            }
          }
        }
      });
    });
  }
}
