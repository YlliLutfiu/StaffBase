import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './user.dto';
import { Roles } from 'src/auth/roles.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() userDto: UserDTO) {
    return this.userService.create(userDto);
  }

  @Get('email/:email')
  async getUserByEmail(@Param('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @Get('username/:username')
  async getUserByUsername(@Param('username') username: string) {
    return this.userService.findByUsername(username);
  }

  @Post('create-employee')
  @Roles('user')
  async createEmployee(@Body() userDto: UserDTO) {
    return this.userService.createEmployee(userDto);
  }
}