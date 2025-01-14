import { Entity, Column, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';

@Entity({ schema: 'staffbase', name: 'tasks' })
export class Task {
  @PrimaryGeneratedColumn()
  task_id: number;

  @Column({ length: 100 })
  task_name: string;

  @Column({ type: 'text', nullable: true })
  task_description: string;

  @Column({ type: 'int', nullable: true })
  task_employee: number;

  @Column({ type: 'date', nullable: true })
  task_deadline: Date;

  @Column({ length: 50, nullable: true })
  task_status: string;
}
