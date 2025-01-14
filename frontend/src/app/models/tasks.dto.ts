import { TaskStatus } from "./task-status.enum";

export interface TasksDTO {
    task_id: number;
    task_name: string;
    task_description: string;
    task_employee: number;
    task_deadline: Date;
    task_status: TaskStatus;
    task_employee_name?: string; 
}