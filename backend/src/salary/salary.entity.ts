import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'staffbase', name: 'salary' })
export class Salary {
  @PrimaryGeneratedColumn()
  salary_id: number;

  @Column({ type: 'int' })
  employee_salary: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  salary_amount: number;

  @Column({ type: 'date' })
  salary_date: Date;
}
