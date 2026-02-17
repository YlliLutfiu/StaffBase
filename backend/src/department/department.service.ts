import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from './department.entity';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
  ) {}

  async findAll(userId: number): Promise<Department[]> {
    return this.departmentRepository.find({
      where: { userId },
      order: { department_id: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Department> {
    const department = await this.departmentRepository.findOneBy({ department_id: id });
    if (!department) {
      throw new NotFoundException(`Department with id ${id} not found`);
    }
    return department;
  }

  async create(department: Department): Promise<Department> {
    return await this.departmentRepository.save(department);
  }

  async update(id: number, department: Department): Promise<Department> {
    const departmentToUpdate = await this.findOne(id);
    departmentToUpdate.department_name = department.department_name;
    departmentToUpdate.department_manager = department.department_manager;
    return await this.departmentRepository.save(departmentToUpdate);
  }

  async remove(id: number): Promise<void> {
    const result = await this.departmentRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }
  }
}