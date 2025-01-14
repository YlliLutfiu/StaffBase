import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SalaryDTO } from '../models/salary.dto';

@Injectable({
  providedIn: 'root'
})
export class SalaryService {
  private baseUrl = 'http://localhost:3000/salary';

  constructor(private http: HttpClient) {}

  getSalary(): Observable<SalaryDTO[]> {
    return this.http.get<SalaryDTO[]>(this.baseUrl);
  }

  getSalaryById(salaryId: number): Observable<SalaryDTO> {
    return this.http.get<SalaryDTO>(`${this.baseUrl}/${salaryId}`);
  }

  createSalary(salary: SalaryDTO): Observable<SalaryDTO> {
    return this.http.post<SalaryDTO>(this.baseUrl, salary);
  }

  updateSalary(salaryId: number, salary: SalaryDTO): Observable<SalaryDTO> {
    return this.http.put<SalaryDTO>(`${this.baseUrl}/${salaryId}`, salary);
  }

  deleteSalary(salaryId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${salaryId}`);
  }
}
