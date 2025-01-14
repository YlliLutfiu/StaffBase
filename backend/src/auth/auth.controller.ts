import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDTO } from 'src/user/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() userDto: UserDTO) {
    return this.authService.register(userDto);
  }

  @Post('login')
  async login(@Body() userDto: UserDTO) {
    return this.authService.login(userDto);
  }
}
