export class TaskDTO {
    task_id: number;
    task_name: string;
    task_description: string;
    task_employee: number;
    task_deadline: Date;
    task_status: string;
    userId?: number;
}