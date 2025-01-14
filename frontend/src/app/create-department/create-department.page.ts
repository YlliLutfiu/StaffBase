import { Component, inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DepartmentDTO } from '../models/department.dto';
import { DepartmentService } from '../services/department.service';
import { EmployeeService } from '../services/employee.service';
import { EmployeeDTO } from '../models/employee.dto';

@Component({
  selector: 'app-create-department',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-department.page.html',
  styleUrls: ['./create-department.page.scss'],
})
export class CreateDepartmentPage implements OnInit {
  public departmentObj: DepartmentDTO = {
    department_id: 0,
    department_name: '',
    department_manager: 0,
  };

  public employees: EmployeeDTO[] = [];

  private departmentService = inject(DepartmentService);
  private employeeService = inject(EmployeeService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  public isEditMode: boolean = false;
  private departmentId: number = 0;

  ngOnInit(): void {
    this.loadEmployees();
    this.activatedRoute.paramMap.subscribe((params) => {
      const departmentId = params.get('departmentId');
      if (departmentId) {
        this.isEditMode = true;
        this.departmentId = +departmentId;
        this.loadDepartment(departmentId);
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

  loadDepartment(departmentId: string): void {
    this.departmentService.getDepartmentById(+departmentId).subscribe({
      next: (department) => {
        this.departmentObj = { ...department };
      },
      error: (err) => {
        console.error('Error loading department:', err);
      },
    });
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.departmentService.updateDepartment(this.departmentId, this.departmentObj).subscribe({
        next: () => {
          this.onCancel();
        },
        error: (err) => {
          console.error('Error updating department:', err);
        },
      });
    } else {
      this.departmentService.createDepartment(this.departmentObj).subscribe({
        next: () => {
          this.resetForm();
          this.onCancel();
        },
        error: (err) => {
          console.error('Error creating department:', err);
        },
      });
    }
  }

  resetForm(): void {
    this.departmentObj = {
      department_id: 0,
      department_name: '',
      department_manager: 0,
    };
  }

  onCancel(): void {
    this.router.navigate(['/department']);
  }
}
