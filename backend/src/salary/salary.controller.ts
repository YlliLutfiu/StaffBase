import { Controller, Get, Post, Param, Body, Put, Delete, NotFoundException, UseGuards, Req } from '@nestjs/common';
import { SalaryService } from './salary.service';
import { Salary } from './salary.entity';
import { SalaryDTO } from './salary.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('salary')
export class SalaryController {
  constructor(private readonly salaryService: SalaryService) {}

  @Get()
  async findAll(@Req() req: any): Promise<SalaryDTO[]> {
    const userId = req.user.userId;
    const salaries = await this.salaryService.findAll(userId);
    return salaries.map(salary => this.toDTO(salary));
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<SalaryDTO> {
    const salary = await this.salaryService.findOne(id);
    return this.toDTO(salary);
  }

  @Post()
  async create(@Body() salaryDTO: SalaryDTO, @Req() req: any): Promise<SalaryDTO> {
    const salary = this.fromDTO(salaryDTO);
    salary.userId = req.user.userId;
    const newSalary = await this.salaryService.create(salary);
    return this.toDTO(newSalary);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() salaryDTO: SalaryDTO): Promise<SalaryDTO> {
    const existingSalary = await this.salaryService.findOne(id);
    if (!existingSalary) {
      throw new NotFoundException(`Salary with id ${id} not found`);
    }

    const updatedSalary = await this.salaryService.update(id, this.fromDTO(salaryDTO));
    return this.toDTO(updatedSalary);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<{ message: string }> {
    await this.salaryService.remove(id);
    return { message: `Salary with id ${id} deleted successfully` };
  }

  private toDTO(salary: Salary): SalaryDTO {
    return {
      salary_id: salary.salary_id,
      employee_salary: salary.employee_salary,
      salary_amount: salary.salary_amount,
      salary_date: salary.salary_date,
      userId: salary.userId,
    };
  }

  private fromDTO(salaryDTO: SalaryDTO): Salary {
    return {
      salary_id: salaryDTO.salary_id,
      employee_salary: salaryDTO.employee_salary,
      salary_amount: salaryDTO.salary_amount,
      salary_date: salaryDTO.salary_date,
      userId: salaryDTO.userId,
    } as Salary;
  }
}
