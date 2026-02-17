import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DepartmentService } from '../services/department.service';
import { DepartmentDTO } from '../models/department.dto';
import { EmployeeService } from '../services/employee.service';
import { forkJoin } from 'rxjs';
import { NgxPaginationModule } from 'ngx-pagination';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { AuthService } from '../services/auth.service';

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
  itemsPerPage: number = 5;
  user: any;
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.user = this.authService.getUserData();
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

  exportToPDF(): void {
    const doc = new jsPDF();
  
    const columns = [
      'Department Name',
      'Manager'
    ];
  
    const rows = this.departments.map(department => [
      department.department_name,
      department.manager_name ? department.manager_name : 'N/A'
    ]);
  
    doc.text('Department Report', 14, 15);
  
    autoTable(doc, {
      startY: 20,
      head: [columns],
      body: rows
    });
  
    doc.save('department.pdf');
  }
}
