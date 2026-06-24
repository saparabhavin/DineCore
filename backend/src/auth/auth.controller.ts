import { Controller, Post, Body, UnauthorizedException, Get, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: any) {
    // Basic stub. In reality we validate DTOs.
    if (!body.email || !body.password) throw new UnauthorizedException('Email and password required');
    return this.authService.register(body.email, body.password);
  }

  @Post('login')
  async login(@Body() body: any) {
    if (!body.email || !body.password) throw new UnauthorizedException('Email and password required');
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    return this.authService.login(user);
  }
}
