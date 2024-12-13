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
import { OrderStatus } from '@modules/order/order_status/order_status.entity';
import { Category } from '@modules/product/category/category.entity';

import { SeedService } from './seed.service';
import { Role } from '@modules/user/role/role.entity';
import { Status } from '@modules/user/status/status.entity';
import { rolesJson } from './common/roles';
import { statusesJson } from './common/statuses';
import { order_statusesJson } from './common/order_statuses';
import { categoriesJson } from './common/categories';
import { productAttributesJson } from './common/attributes/product_attributes';
import { Attribute } from '@modules/attribute/entities/attribute.entity';
import { AttributeValue } from '@modules/attribute/entities/attribute-value.entity';
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

  @Get('/admin')
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
  @Get('/category')
  async seed() {}
}
