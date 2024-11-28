import { HttpException, HttpStatus } from '@nestjs/common';

export class ServiceNotInitializedException extends HttpException {
  constructor() {
    super(
      'UserShoppingCartService has not been initialized. Please call init() before using it.',
      HttpStatus.BAD_REQUEST,
    );
  }
}
