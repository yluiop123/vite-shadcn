import { Body, Controller, Post } from '@nestjs/common';
import { ResponseDto } from '../common/dto/response.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    const user = await this.authService.validateUser(
      body.username,
      body.password,
    );
    if (!user) {
      return ResponseDto.ok({ message: '用户名或密码错误' });
    }
    const result = this.authService.login(user);
    return ResponseDto.ok(result);
  }

  @Post('register')
  async register(
    @Body()
    body: {
      username: string;
      password: string;
      name: string;
      email?: string;
    },
  ) {
    const result = await this.authService.register(body);
    return ResponseDto.ok(result);
  }
}
