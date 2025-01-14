import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'staffbase', name: 'departments' })
export class Department {
  @PrimaryGeneratedColumn()
  department_id: number;

  @Column({ length: 100 })
  department_name: string;

  @Column({ type: 'int', nullable: true })
  department_manager: number;
}
