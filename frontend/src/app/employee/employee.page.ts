import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../services/employee.service';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule
  ],
  providers: [EmployeeService],
  templateUrl: './employee.page.html',
  styleUrls: ['./employee.page.scss']
})
export class EmployeePage implements OnInit {
  employees: any[] = [];
  filteredEmployees: any[] = [];
  suggestions: any[] = [];
  private employeeService = inject(EmployeeService);
  private router = inject(Router);
  searchTerm: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  sortColumn: string = '';
  p: number = 1;
  isModalOpen: boolean = false;
  employeeToDelete: any = null;

  constructor() {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe((response) => {
      this.employees = response;
      this.filteredEmployees = response; // Initially, all employees are shown
    });
  }

  onSearchChange(event: Event) {
    this.searchTerm = (event.target as HTMLInputElement).value.trim();
    this.updateSuggestions();
  }

  updateSuggestions() {
    if (this.searchTerm.trim()) {
      this.suggestions = this.employees.filter(employee => 
        employee.employee_name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.suggestions = this.employees;
    }
  }

  performSearch() {
    if (this.searchTerm) {
      this.filteredEmployees = this.suggestions;
    } else {
      this.filteredEmployees = this.employees;
    }
    setTimeout(() => {
      this.suggestions = [];
    }, 100);
  }

  selectSuggestion(suggestion: any) {
    this.searchTerm = suggestion.employee_name;
    this.filteredEmployees = [suggestion];
    this.suggestions = [];
  }

  onSearchFocus() {
    this.updateSuggestions();
  }

  onSearchBlur() {
    setTimeout(() => {
      this.suggestions = [];
    }, 100);
  }

  clearSearch() {
    this.searchTerm = '';
    this.filteredEmployees = this.employees;
  }

  highlightText(text: string): string {
    const regex = new RegExp(`(${this.searchTerm})`, "gi");
    return text.replace(regex, '<span class="text-orange-400 text-lg">$1</span>');
  }

  openEditModal(employeeId: number) {
    this.router.navigate(['/create-employee', employeeId]);
  }

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

  sortEmployees(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
  
    this.employees.sort((a, b) => {
      let valueA = a[column];
      let valueB = b[column];
  
      if (typeof valueA === 'number' && typeof valueB === 'number') {
        if (this.sortDirection === 'asc') {
          return valueA - valueB;
        } else {
          return valueB - valueA;
        }
      }
  
      valueA = valueA ? valueA.toString().toLowerCase() : '';
      valueB = valueB ? valueB.toString().toLowerCase() : '';
      
      if (this.sortDirection === 'asc') {
        return valueA < valueB ? -1 : 1;
      } else {
        return valueA > valueB ? -1 : 1;
      }
    });
  }

  sendToCreateEmployee() {
    this.router.navigate(['/create-employee']);
  }

  exportToPDF(): void {
    const doc = new jsPDF();
  
    const columns = [
      'Name',
      'Position',
      'Phone',
      'Email',
      'Department',
      'Salary (€)'
    ];
  
    const rows = this.filteredEmployees.map(employee => [
      employee.employee_name,
      employee.employee_position,
      employee.employee_phone,
      employee.employee_email,
      employee.employee_department,
      employee.employee_salary
    ]);
  
    doc.text('Employee Report', 14, 15);
  
    autoTable(doc, {
      startY: 20,
      head: [columns],
      body: rows,
    });
  
    doc.save('employees.pdf');
  }
}
