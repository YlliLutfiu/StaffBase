import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'src/user/user.entitiy';

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

  @ManyToOne(() => User, (user) => user.salaries, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: number;
}
