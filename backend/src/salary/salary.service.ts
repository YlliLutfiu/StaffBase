import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Salary } from './salary.entity';

@Injectable()
export class SalaryService {
  constructor(
    @InjectRepository(Salary)
    private readonly salaryRepository: Repository<Salary>,
  ) {}

  async findAll(): Promise<Salary[]> {
    return this.salaryRepository.find({
      order: {
        salary_id: 'DESC',
      },
    });
  }

  async findOne(id: number): Promise<Salary> {
    const salary = await this.salaryRepository.findOneBy({ salary_id: id });
    if (!salary) {
      throw new NotFoundException(`Salary with id ${id} not found`);
    }
    return salary;
  }

  async create(salary: Salary): Promise<Salary> {
    return await this.salaryRepository.save(salary);
  }

  async update(id: number, salary: Salary): Promise<Salary> {
    const salaryToUpdate = await this.findOne(id);
    salaryToUpdate.employee_salary = salary.employee_salary;
    salaryToUpdate.salary_amount = salary.salary_amount;
    salaryToUpdate.salary_date = salary.salary_date;
    return await this.salaryRepository.save(salaryToUpdate);
  }

  async remove(id: number): Promise<void> {
    const result = await this.salaryRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Salary with ID ${id} not found`);
    }
  }
}
