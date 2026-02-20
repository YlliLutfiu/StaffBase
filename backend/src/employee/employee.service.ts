import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './employee.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async findAll(userId: number): Promise<Employee[]> {
    return await this.employeeRepository.find({
      where: { userId },
      order: { employee_id: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Employee> {
    return await this.employeeRepository.findOneBy({ employee_id: id });
  }

  async create(employee: Employee): Promise<Employee> {
    return await this.employeeRepository.save(employee);
  }

  async update(id: number, employee: Employee): Promise<Employee> {
    const employeeToUpdate = await this.employeeRepository.findOne({
      where: { employee_id: id },
    });
  
    if (!employeeToUpdate) {
      throw new NotFoundException(`Employee with id ${id} not found`);
    }
  
    employeeToUpdate.employee_name = employee.employee_name;
    employeeToUpdate.employee_position = employee.employee_position;
    employeeToUpdate.employee_phone = employee.employee_phone;
    employeeToUpdate.employee_email = employee.employee_email;
    employeeToUpdate.employee_department = employee.employee_department;
    employeeToUpdate.employee_salary = employee.employee_salary;
    employeeToUpdate.employee_createdAt = employee.employee_createdAt;
  
    return await this.employeeRepository.save(employeeToUpdate);
  }

  async remove(id: number): Promise<void> {
    const result = await this.employeeRepository.delete(id);
    if (result.affected === 0) {
      throw new Error(`Employee with ID ${id} not found`);
    }
  }
}