export interface DepartmentDTO {
    department_id: number;
    department_name: string;
    department_manager: number;
    manager_name?: string; 
    userId?: number;
  }