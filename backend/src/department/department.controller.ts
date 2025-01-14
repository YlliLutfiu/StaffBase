import { Controller, Get, Post, Param, Body, Put, Delete, NotFoundException } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { Department } from './department.entity';
import { DepartmentDTO } from './department.dto';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Get()
  async findAll(): Promise<DepartmentDTO[]> {
    const departments = await this.departmentService.findAll();
    return departments.map(department => this.toDTO(department));
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<DepartmentDTO> {
    const department = await this.departmentService.findOne(id);
    return this.toDTO(department);
  }

  @Post()
  async create(@Body() departmentDTO: DepartmentDTO): Promise<DepartmentDTO> {
    const department = this.fromDTO(departmentDTO);
    const newDepartment = await this.departmentService.create(department);
    return this.toDTO(newDepartment);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() departmentDTO: DepartmentDTO): Promise<DepartmentDTO> {
    const existingDepartment = await this.departmentService.findOne(id);
    if (!existingDepartment) {
      throw new NotFoundException(`Department with id ${id} not found`);
    }

    const updatedDepartment = await this.departmentService.update(id, this.fromDTO(departmentDTO));
    return this.toDTO(updatedDepartment);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<{ message: string }> {
    await this.departmentService.remove(id);
    return { message: `Department with id ${id} deleted successfully` };
  }

  private toDTO(department: Department): DepartmentDTO {
    return {
      department_id: department.department_id,
      department_name: department.department_name,
      department_manager: department.department_manager,
    };
  }

  private fromDTO(departmentDTO: DepartmentDTO): Department {
    return {
      department_id: departmentDTO.department_id,
      department_name: departmentDTO.department_name,
      department_manager: departmentDTO.department_manager,
    } as Department;
  }
}
