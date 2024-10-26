import { Injectable, Req } from '@nestjs/common';

@Injectable()
export class RequestUtil {
  static getToken(request: Request) {
    return request.headers['authorization']?.split(' ')[1];
  }
}
