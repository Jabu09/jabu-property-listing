import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from 'src/utils/user.decorator';
import { AuthService } from './auth.service';
import { RegisterRequestDto } from './dto/registerRequest.dto';

@Controller('auth')
@ApiTags('auth')
@ApiBearerAuth('access-token')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() user: RegisterRequestDto) {
    return this.authService.login(user);
  }

  @UseGuards(AuthGuard('jwt-refresh-token'))
  @Get('refreshToken')
  async refreshToken(@User() user) {
    return await this.authService.refreshLogin(
      user.sub,
      user.username,
      user.email,
    );
  }

  @Post('register')
  register(@Body() user: RegisterRequestDto) {
    return this.authService.register(user);
  }
}
