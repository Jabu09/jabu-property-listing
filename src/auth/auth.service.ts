import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { RegisterRequestDto } from './dto/registerRequest.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    if (user) {
      const isLoginSuccess = await this.paaswordValidate(
        pass,
        user.password,
        user.secretKey,
      );
      const { username, id, secretKey } = user;
      if (isLoginSuccess) {
        return { username, id, secretKey };
      }
      return null;
    }
    return null;
  }

  async login(user: any) {
    const _user = await this.validateUser(user.username, user.password);
    if (_user) {
      const token = await this.getTokens(_user.id, _user.username, _user.email);
      return token;
    }
    throw new BadRequestException('invalid password');
  }

  async register(user: RegisterRequestDto) {
    return await this.usersService.create(user);
  }

  async refreshLogin(userId: string, username: string, email: string) {
    return await this.getTokens(userId, username, email);
  }

  private async paaswordValidate(
    password: string,
    hashPassword: string,
    secretKey: string,
  ) {
    const hash = await bcrypt.hash(password, secretKey);
    return hashPassword === hash;
  }

  private async getTokens(userId: string, username: string, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
          email,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
          email,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
