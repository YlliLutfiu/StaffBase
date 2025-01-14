import { Controller, Get, Post, Param, Body, Put, Delete, NotFoundException } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee } from './employee.entity';
import { EmployeeDTO } from './employee.dto';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  async findAll(): Promise<EmployeeDTO[]> {
    const employees = await this.employeeService.findAll();
    return employees.map(employee => this.toDTO(employee));
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<EmployeeDTO> {
    const employee = await this.employeeService.findOne(id);
    return this.toDTO(employee);
  }

  @Post()
  async create(@Body() employeeDTO: EmployeeDTO): Promise<EmployeeDTO> {
    const employee = this.fromDTO(employeeDTO);
    const newEmployee = await this.employeeService.create(employee);
    return this.toDTO(newEmployee);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<{ message: string }> {
    try {
      await this.employeeService.remove(id);
      return { message: `Employee with id ${id} deleted successfully` };
    } catch (error) {
      throw new NotFoundException(error.message || 'Failed to delete employee');
    }
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() employeeDTO: EmployeeDTO): Promise<EmployeeDTO> {
    const existingEmployee = await this.employeeService.findOne(id);
    if (!existingEmployee) {
      throw new NotFoundException(`Employee with id ${id} not found`);
    }

    const updatedEmployee = await this.employeeService.update(id, this.fromDTO(employeeDTO));
    return this.toDTO(updatedEmployee);
  }


  private toDTO(employee: Employee): EmployeeDTO {
    return {
      employee_id: employee.employee_id,
      employee_name: employee.employee_name,
      employee_position: employee.employee_position,
      employee_phone: employee.employee_phone,
      employee_email: employee.employee_email,
      employee_department: employee.employee_department,
      employee_salary: employee.employee_salary,
      employee_createdAt: employee.employee_createdAt.toISOString(),
    };
  }

  private fromDTO(employeeDTO: EmployeeDTO): Employee {
    return {
      employee_id: employeeDTO.employee_id,
      employee_name: employeeDTO.employee_name,
      employee_position: employeeDTO.employee_position,
      employee_phone: employeeDTO.employee_phone,
      employee_email: employeeDTO.employee_email,
      employee_department: employeeDTO.employee_department,
      employee_salary: employeeDTO.employee_salary,
      employee_createdAt: new Date(employeeDTO.employee_createdAt),
    } as Employee;
  }
}
