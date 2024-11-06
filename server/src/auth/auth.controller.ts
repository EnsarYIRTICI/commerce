import {
  Body,
  Controller,
  Post,
  HttpException,
  HttpStatus,
  Req,
  Get,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { errorMessages } from '@common/errorMessages';
import { successMessages } from '@common/successMessages';
import { RegisterDto } from './dto/register.dto';
import { Roles } from '@decorators/role.decorator';
import { RedisService } from '@database/redis/redis.service';
import { RequestUtil } from '@utils/request.util';
import { ApiBearerAuth } from '@nestjs/swagger';

import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
  ) {}

  @Roles('public')
  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
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

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: 'strict',
    });

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

  @Roles('public')
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

  @Roles('user')
  @Get('user')
  @ApiBearerAuth()
  async user(@Req() request: Request) {
    return request['user'];
  }

  @Roles('user')
  @Get('logout')
  async logout(@Req() request: Request) {
    const token = RequestUtil.getToken(request);

    const oneWeekInSeconds = 7 * 24 * 60 * 60;

    await this.redisService.addTokenToBlacklist(token, oneWeekInSeconds);

    return {
      message: successMessages.LOGIN_SUCCESS,
    };
  }
}
