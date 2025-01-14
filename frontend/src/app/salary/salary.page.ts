import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SalaryService } from '../services/salary.service';
import { SalaryDTO } from '../models/salary.dto';
import { EmployeeService } from '../services/employee.service';
import { forkJoin } from 'rxjs';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-salary',
  standalone: true,
  imports: [
    CommonModule,
    NgxPaginationModule
  ],
  templateUrl: './salary.page.html',
  styleUrl: './salary.page.scss'
})
export class SalaryPage implements OnInit {
  salaries: SalaryDTO[] = [];
  private router = inject(Router);
  private salaryService = inject(SalaryService);
  private employeeService = inject(EmployeeService);
  p: number = 1;

  ngOnInit(): void {
    this.loadSalaries();
  }

  loadSalaries(): void {
    this.salaryService.getSalary().subscribe(
      (response) => {
        this.salaries = response;
        this.fetchEmployeeNames();
      },
      (error) => {
        console.error('Error fetching salaries:', error);
      }
    );
  }

  fetchEmployeeNames(): void {
    const employeeRequests = this.salaries.map(salary => 
      this.employeeService.getEmployeeById(salary.employee_salary)
    );

    forkJoin(employeeRequests).subscribe((employees) => {
      employees.forEach((employee, index) => {
        this.salaries[index].salary_employee_name = employee.employee_name;
      });
    });
  }

  sendToCreateSalary() {
    this.router.navigate(['/create-salary']);
  }

  openEditModal(salaryId: number): void {
    this.router.navigate(['/create-salary', salaryId]);
  }
}
