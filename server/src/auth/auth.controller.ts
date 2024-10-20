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
        'Kullanıcı veya şifre hatalı',
        HttpStatus.UNAUTHORIZED,
      );
    }

    // Kullanıcı bilgileriyle JWT token oluşturma
    const payload = { id: user.id, email: user.email };
    const token = this.jwtService.sign(payload); // NestJS JwtService kullanarak token oluşturma

    return {
      message: 'Giriş başarılı',
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
