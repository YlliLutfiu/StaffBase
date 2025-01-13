import { Component, inject, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../services/employee.service';

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

  constructor() {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe((response) => {
      this.employees = response;
    });
  }
}
