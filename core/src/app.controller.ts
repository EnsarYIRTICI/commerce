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

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}
}
