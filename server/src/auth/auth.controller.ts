import {
  Body,
  Controller,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt'; // NestJS'in kendi JwtService'i
import { Public } from './public.decorator';
import { errorMessages } from '@common/errorMessages';
import { successMessages } from '@common/successMessages';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService, // NestJS'in JwtService'ini kullanıyoruz
  ) {}

  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );

    if (!user) {
      throw new HttpException(
        errorMessages.INVALID_CREDENTIALS,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const payload = {
      id: user.id,
      email: user.email,
      lastPasswordChange: user.lastPasswordChange,
    };

    const token = this.jwtService.sign(payload);

    return {
      message: successMessages.LOGIN_SUCCESS,
      token,
      user: {
        id: user.id,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
      },
    };
  }

  @Public()
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const user = await this.authService.create(registerDto, new Date());

    const payload = {
      id: user.id,
      email: user.email,
      lastPasswordChange: user.lastPasswordChange,
    };

    const token = this.jwtService.sign(payload);

    return {
      message: successMessages.LOGIN_SUCCESS,
      token,
      user: {
        id: user.id,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
      },
    };
  }
}
