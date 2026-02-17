import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './user.entitiy';
import { UserDTO } from './user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }

  async create(userDto: UserDTO): Promise<User> {
    const user = this.userRepository.create(userDto);
    return this.userRepository.save(user);
  }

  async createEmployee(userDto: UserDTO): Promise<User> {
    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    const employeeUser = this.userRepository.create({
      ...userDto,
      password: hashedPassword,
      role: UserRole.EMPLOYEE,
    });
    return this.userRepository.save(employeeUser);
  }
}