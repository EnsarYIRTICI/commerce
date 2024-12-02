import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
  Req,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';

import { UserService } from './user.service';
import { User } from './user.entity';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

import { Roles } from 'src/shared/decorators/role.decorator';

@Roles('user')
@ApiBearerAuth()
@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() user: User) {
    return this.userService.create(user);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() user: User) {
    return this.userService.update(id, user);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.userService.delete(id);
  }
}
