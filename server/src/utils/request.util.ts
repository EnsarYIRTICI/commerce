import { Injectable, Req } from '@nestjs/common';

@Injectable()
export class RequestUtil {
  static getToken(request: Request): string | null {
    const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }

    return authHeader.split(' ')[1];
  }
}
