import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
  InternalServerErrorException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { SeedService } from './seed.service';
import { QueryFailedError } from 'typeorm';
import { UserService } from '@modules/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { successMessages } from '@shared/common/successMessages';
import { errorMessages } from '@shared/common/errorMessages';

@ApiTags('Seed')
@Controller('seeds')
export class SeedController {
  constructor(
    private readonly seedService: SeedService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  @Post('admin')
  async admin() {
    try {
      const registerDto = {
        email: 'turing@turing.com',
        password: 'turing',
        name: 'Alan',
        lastname: 'Turing',
      };

      let user;

      try {
        user = await this.seedService.admin(registerDto);
      } catch (error) {
        if (
          error instanceof QueryFailedError &&
          error.message.includes('duplicate key value')
        ) {
          console.log('--> Admin hesabı zaten oluşturulmuş');
        }

        user = await this.userService.findOneByEmail(registerDto.email);
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

  @ApiBearerAuth()
  @Post('category')
  async category() {
    await this.seedService.category();
  }

  @ApiBearerAuth()
  @Post('product-attribute')
  async product_attribute() {
    await this.seedService.product_attribute();
  }

  @ApiBearerAuth()
  @Post('attribute-type')
  async attribute_type() {
    await this.seedService.attribute_type();
  }

  @ApiBearerAuth()
  @Post('role')
  async role() {
    await this.seedService.role();
  }

  @ApiBearerAuth()
  @Post('status')
  async status() {
    await this.seedService.status();
  }

  @ApiBearerAuth()
  @Post('order-status')
  async order_status() {
    await this.seedService.order_status();
  }
}
