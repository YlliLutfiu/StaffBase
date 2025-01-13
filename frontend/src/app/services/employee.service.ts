import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeeDTO } from '../models/employee.dto';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl = 'http://localhost:3000/employees';

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<EmployeeDTO[]> {
    return this.http.get<EmployeeDTO[]>(this.baseUrl);
  }

  getEmployeeById(id: number): Observable<EmployeeDTO> {
    return this.http.get<EmployeeDTO>(`${this.baseUrl}/${id}`);
  }

  createEmployee(employee: EmployeeDTO): Observable<EmployeeDTO> {
    return this.http.post<EmployeeDTO>(this.baseUrl, employee);
  }

  updateEmployee(id: number, employee: Partial<EmployeeDTO>): Observable<EmployeeDTO> {
    return this.http.put<EmployeeDTO>(`${this.baseUrl}/${id}`, employee);
  }

  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
