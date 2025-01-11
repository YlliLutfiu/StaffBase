import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(
    @Body()
    createUserDto: {
      username: string;
      email: string;
      password: string;
    },
  ) {
    return this.userService.createUser(
      createUserDto.username,
      createUserDto.email,
      createUserDto.password,
    );
  }

  @Get(':id')
  async getUser(@Param('id') id: number) {
    return this.userService.findOne(id);
  }
}
