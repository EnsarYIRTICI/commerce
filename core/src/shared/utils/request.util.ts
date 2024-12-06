import { Request } from 'express';

function getToken(request: Request): string | null {
  const authHeader = request.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  return authHeader.split(' ')[1];
}

export { getToken };
