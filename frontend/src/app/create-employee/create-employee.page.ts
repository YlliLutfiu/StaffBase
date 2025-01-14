import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmployeeDTO } from '../models/employee.dto';
import { EmployeeService } from '../services/employee.service';
import { DepartmentDTO } from '../models/department.dto';
import { DepartmentService } from '../services/department.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-employee.page.html',
  styleUrls: ['./create-employee.page.scss']
})
export class CreateEmployeePage implements OnInit {
  public employeeObj: EmployeeDTO = {
    employee_id: 0,
    employee_name: "",
    employee_position: "",
    employee_phone: "",
    employee_email: "",
    employee_department: "",
    employee_salary: 0,
    employee_createdAt: "",
  };
  private employeeService = inject(EmployeeService);
  private departmentService = inject(DepartmentService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  
  public isEditMode: boolean = false;
  
  employeeId: number = 0;
  departments: DepartmentDTO[] = [];

  constructor() {}
  ngOnInit() {
    this.loadDepartments();

    this.activatedRoute.paramMap.subscribe(params => {
      const employeeId = params.get('employeeId');
      if (employeeId) {
        this.isEditMode = true;
        this.employeeId = +employeeId;
        this.loadEmployee(employeeId);
      }
    });
  }

  loadDepartments() {
    this.departmentService.getDepartments().subscribe({
      next: (response) => {
        this.departments = response;
      },
      error: (err) => {
        console.error('Error loading departments:', err);
      }
    });
  }

  loadEmployee(employeeId: string) {
    this.employeeService.getEmployeeById(+employeeId).subscribe({
      next: (employee) => {
        this.employeeObj = { ...employee };
      },
      error: (err) => {
        console.error('Error loading employee:', err);
      },
    });
  }

  onSubmit() {
    this.employeeObj.employee_createdAt = new Date().toISOString();

    if (this.isEditMode) {
      this.employeeService.updateEmployee(this.employeeId, this.employeeObj).subscribe({
        next: (response) => {
          console.log('Employee updated:', response);
          this.onCancel();
        },
        error: (err) => {
          console.error('Error updating employee:', err);
        },
      });
    } else {
      this.employeeService.createEmployee(this.employeeObj).subscribe({
        next: (response) => {
          console.log('Employee added:', response);
          this.resetForm();
          this.onCancel();
        },
        error: (err) => {
          console.error('Error adding employee:', err);
        },
      });
    }
  }

  resetForm() {
    this.employeeObj = {
      employee_id: 0,
      employee_name: '',
      employee_position: '',
      employee_phone: '',
      employee_email: '',
      employee_department: '',
      employee_salary: 0,
      employee_createdAt: '',
    };
  }

  onCancel() {
    this.router.navigate(['/employee']);
  }
}
