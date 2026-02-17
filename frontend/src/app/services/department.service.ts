import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DepartmentDTO } from '../models/department.dto';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private baseUrl = 'http://localhost:3000/department';

  constructor(private http: HttpClient) {}

  getDepartments(): Observable<DepartmentDTO[]> {
    return this.http.get<DepartmentDTO[]>(`${this.baseUrl}`);
  }

  getDepartmentById(departmentId: number): Observable<DepartmentDTO> {
    return this.http.get<DepartmentDTO>(`${this.baseUrl}/${departmentId}`);
  }

  createDepartment(department: DepartmentDTO): Observable<DepartmentDTO> {
    return this.http.post<DepartmentDTO>(this.baseUrl, department);
  }

  updateDepartment(departmentId: number, department: DepartmentDTO): Observable<DepartmentDTO> {
    return this.http.put<DepartmentDTO>(`${this.baseUrl}/${departmentId}`, department);
  }

  deleteDepartment(departmentId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${departmentId}`);
  }
}
