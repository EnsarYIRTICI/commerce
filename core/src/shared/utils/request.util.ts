import { Request } from 'express';

const getToken = (request: Request): string | null => {
  const authHeader = request.headers['authorization'];
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.split(' ')[1];
  }

  const tokenFromCookie = request.cookies?.token;
  if (tokenFromCookie) {
    return tokenFromCookie;
  }

  return null;
};

export { getToken };
