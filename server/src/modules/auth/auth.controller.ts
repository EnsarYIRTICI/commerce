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
import { errorMessages } from 'src/shared/common/errorMessages';
import { successMessages } from 'src/shared/common/successMessages';
import { RegisterDto } from './dto/register.dto';
import { Roles } from 'src/shared/decorators/role.decorator';
import { RedisService } from '@modules/cache/redis/redis.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { Response, Request } from 'express';
import { getToken } from 'src/shared/utils/request.util';
import { BlacklistService } from '@modules/cache/blacklist.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly blacklistService: BlacklistService,
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
  @ApiBearerAuth()
  async logout(@Req() request: Request) {
    const token = getToken(request);

    const oneWeekInSeconds = 7 * 24 * 60 * 60;

    await this.blacklistService.addTokenTolist(token);

    return {
      message: successMessages.LOGIN_SUCCESS,
    };
  }
}
