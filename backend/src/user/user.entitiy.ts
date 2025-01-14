import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'staffbase', name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}
