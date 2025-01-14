import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TasksDTO } from '../models/tasks.dto';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private baseUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<TasksDTO[]> {
    return this.http.get<TasksDTO[]>(this.baseUrl);
  }

  getTaskById(taskId: number): Observable<TasksDTO> {
    return this.http.get<TasksDTO>(`${this.baseUrl}/${taskId}`);
  }

  createTask(tasks: TasksDTO): Observable<TasksDTO> {
    return this.http.post<TasksDTO>(this.baseUrl, tasks);
  }

  updateTask(taskId: number, tasks: TasksDTO): Observable<TasksDTO> {
    return this.http.put<TasksDTO>(`${this.baseUrl}/${taskId}`, tasks);
  }

  deleteTask(taskId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${taskId}`);
  }
}
