import { User } from 'src/user/user.entitiy';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity({ schema: 'staffbase', name: 'departments' })
export class Department {
  @PrimaryGeneratedColumn()
  department_id: number;

  @Column({ length: 100 })
  department_name: string;

  @Column({ type: 'int', nullable: true })
  department_manager: number;

  @ManyToOne(() => User, (user) => user.departments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: number;
}