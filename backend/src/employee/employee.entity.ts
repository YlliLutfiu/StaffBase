import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity({ schema: 'staffbase', name: 'employee' })
export class Employee {
  @PrimaryGeneratedColumn()
  employee_id: number;

  @Column({ length: 100 })
  employee_name: string;

  @Column({ length: 100 })
  employee_position: string;

  @Column({ length: 15, nullable: true })
  employee_phone: string;

  @Column({ length: 255, unique: true, nullable: true })
  employee_email: string;

  @Column({ length: 100, nullable: true })
  employee_department: string;

  @CreateDateColumn()
  employee_createdAt: Date;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  employee_salary: number;
}
