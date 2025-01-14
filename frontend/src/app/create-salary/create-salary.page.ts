import { Component, inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../services/employee.service';
import { EmployeeDTO } from '../models/employee.dto';
import { SalaryDTO } from '../models/salary.dto';
import { SalaryService } from '../services/salary.service';

@Component({
  selector: 'app-create-salary',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-salary.page.html',
  styleUrls: ['./create-salary.page.scss'],
})
export class CreateSalaryPage implements OnInit {
  public salaryObj: SalaryDTO = {
    salary_id: 0,
    employee_salary: 0,
    salary_amount: 0,
    salary_date: new Date(),
  };

  public employees: EmployeeDTO[] = [];
  public isEditMode: boolean = false;
  private salaryId: number = 0;

  private salaryService = inject(SalaryService);
  private employeeService = inject(EmployeeService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.loadEmployees();

    this.activatedRoute.paramMap.subscribe((params) => {
      const salaryId = params.get('salaryId');
      if (salaryId) {
        this.isEditMode = true;
        this.salaryId = +salaryId;
        this.loadSalary(salaryId);
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

  loadSalary(salaryId: string): void {
    this.salaryService.getSalaryById(+salaryId).subscribe({
      next: (salary) => {
        this.salaryObj = { ...salary };
      },
      error: (err) => {
        console.error('Error loading salary:', err);
      },
    });
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.salaryService.updateSalary(this.salaryId, this.salaryObj).subscribe({
        next: () => {
          this.onCancel();
        },
        error: (err) => {
          console.error('Error updating salary:', err);
        },
      });
    } else {
      this.salaryService.createSalary(this.salaryObj).subscribe({
        next: () => {
          this.resetForm();
          this.onCancel();
        },
        error: (err) => {
          console.error('Error creating salary:', err);
        },
      });
    }
  }

  resetForm(): void {
    this.salaryObj = {
      salary_id: 0,
      employee_salary: 0,
      salary_amount: 0,
      salary_date: new Date(),
    };
  }

  onCancel(): void {
    this.router.navigate(['/salary']);
  }
}
