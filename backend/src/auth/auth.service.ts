import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { UserDTO } from 'src/user/user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(userDto: UserDTO) {
    const { username, email, password } = userDto;

    if (await this.userService.findByEmail(email)) {
      throw new BadRequestException('Email already exists');
    }

    if (await this.userService.findByUsername(username)) {
      throw new BadRequestException('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.userService.create({ ...userDto, password: hashedPassword });

    return {
      message: 'User registered successfully',
      user: { user_id: newUser.user_id, username: newUser.username, email: newUser.email },
    };
  }

  async login(userDto: UserDTO) {
  const { email, password } = userDto;
  const user = await this.userService.findByEmail(email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new UnauthorizedException('Invalid email or password');
  }

  const payload = { userId: user.user_id, username: user.username };

  const token = this.jwtService.sign(payload);

  return { accessToken: token, username: user.username };
}
}
