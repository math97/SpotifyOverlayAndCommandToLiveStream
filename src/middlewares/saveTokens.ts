import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';
import AppError from '../AppError';
interface TokenPayload {
  exp: number,
  sub: string,
  refresh:string,
}

export default function saveToken(request:Request,response:Response,next:NextFunction):void{
  const authHeader = request.headers.authorization;
  
  if (!authHeader) throw new AppError('JWT token is missing', 401);

  const [, token] = authHeader.split(' ');
  try {
    const decoded = verify(token, authConfig.jwt.secret as string)

    const { sub,refresh } = decoded as TokenPayload;

    request.token.accessToken = sub;
    request.token.refreshToken = refresh;

    return next();

  } catch {
    throw new AppError('Invalid JWT token', 401);
  }


}