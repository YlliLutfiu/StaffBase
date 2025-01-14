import { Component, inject, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [EmployeeService],
  templateUrl: './employee.page.html',
  styleUrls: ['./employee.page.scss']
})
export class EmployeePage implements OnInit {
  employees: any[] = [];
  private employeeService = inject(EmployeeService);
  private router = inject(Router)

  openEditModal(employeeId: number) {
    this.router.navigate(['/create-employee', employeeId]);
  }

  isModalOpen: boolean = false;
  employeeToDelete: any = null;

  openDeleteModal(employeeId: number) {
    this.employeeToDelete = employeeId;
    this.isModalOpen = true;
  }

  onCancelDelete() {
    this.isModalOpen = false;
    this.employeeToDelete = null;
  }

  onConfirmDelete() {
    if (this.employeeToDelete) {
      this.employeeService.deleteEmployee(this.employeeToDelete).subscribe({
        next: () => {
          console.log('Employee deleted successfully.');
          this.loadEmployees();
        },
        error: (err) => {
          console.error('Error deleting employee:', err);
        }
      });
    }
    this.isModalOpen = false;
    this.employeeToDelete = null;
  }

  constructor() {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe((response) => {
      this.employees = response;
    });
  }

  sendToCreateEmployee() {
    this.router.navigate(['/create-employee'])
  }
}
