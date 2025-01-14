import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DepartmentService } from '../services/department.service';
import { DepartmentDTO } from '../models/department.dto';
import { EmployeeService } from '../services/employee.service';
import { forkJoin } from 'rxjs';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [
    CommonModule,
    NgxPaginationModule
  ],
  templateUrl: './department.page.html',
  styleUrl: './department.page.scss'
})
export class DepartmentPage implements OnInit {
  departments: DepartmentDTO[] = [];
  private router = inject(Router);
  private departmentService = inject(DepartmentService);
  private employeeService = inject(EmployeeService);
  managerName?: string;
  p: number = 1;

  ngOnInit(): void {
    this.loadDepartments();
  }

  fetchManagerNames(): void {
    const requests = this.departments.map((department) =>
      this.employeeService.getEmployeeById(department.department_manager)
    );

    forkJoin(requests).subscribe((responses) => {
      responses.forEach((employee, index) => {
        this.departments[index].manager_name = employee.employee_name;
      });
    });
  }

  loadDepartments(): void {
    this.departmentService.getDepartments().subscribe((response) => {
      this.departments = response;
      this.fetchManagerNames();
    });
  }

  sendToCreateDepartment() {
    this.router.navigate(['/create-department']);
  }

  openEditModal(departmentId: number): void {
    this.router.navigate(['/create-department', departmentId]);
  }
}
