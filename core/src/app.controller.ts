import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { successMessages } from 'src/shared/common/successMessages';
import { RegisterDto } from '@modules/auth/dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { Roles } from 'src/shared/decorators/role.decorator';
import { errorMessages } from 'src/shared/common/errorMessages';
import { QueryFailedError } from 'typeorm';
import { ApiTags } from '@nestjs/swagger';

@Roles('public')
@ApiTags('App')
@Controller('app')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly jwtService: JwtService,
  ) {}

  @Get('/initAdmin')
  async initAdmin() {
    try {
      const registerDto = {
        email: 'turing@turing.com',
        password: 'turing',
        name: 'Alan',
        lastname: 'Turing',
      };

      let user;

      try {
        user = await this.appService.createAdmin(registerDto);
      } catch (error) {
        if (
          error instanceof QueryFailedError &&
          error.message.includes('duplicate key value')
        ) {
          console.log('--> Admin hesabı zaten oluşturulmuş');
        }

        user = await this.appService.findAdmin(registerDto.email);
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
    } catch (error) {
      console.log(error);

      throw new HttpException(
        errorMessages.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
