import { Body, Controller, Get, HttpCode, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterRefugeDto } from './dto/register-refuge.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(201)
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @HttpCode(200)
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('register-refuge')
  @HttpCode(201)
  registerRefuge(@Body() dto: RegisterRefugeDto) {
    return this.authService.registerRefuge(dto);
  }

  @Post('login-refuge')
  @HttpCode(200)
  loginRefuge(@Body() dto: LoginDto) {
    return this.authService.loginRefuge(dto);
  }

  @Post('logout')
  @HttpCode(200)
  logout() {
    return { message: 'Déconnecté' };
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  getMe(@Req() req: { user: { id: number } }) {
    return this.authService.getMe(req.user.id);
  }

  @Patch('me')
  @UseGuards(AuthGuard('jwt'))
  updateProfile(@Req() req: { user: { id: number } }, @Body() dto: UpdateProfileDto) {
    return this.authService.updateProfile(req.user.id, dto);
  }
}
