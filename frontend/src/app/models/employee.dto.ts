export interface EmployeeDTO {
  employee_id: number;
  employee_name: string;
  employee_position: string;
  employee_phone: string;
  employee_email: string;
  employee_department: string;
  employee_salary: number;
  employee_createdAt: string;
  userId?: number;
}