import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { AppError } from '@shared/errors/AppError';
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token not provided.', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(
      token,
      'd96d1b202de225476880ae0046f2b2af'
    ) as IPayload;

    const usersRepository = new UsersRepository();
    const user = usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exists!', 401);
    }

    request.user = {
      id: user_id,
    };

    return next();
  } catch {
    throw new AppError('Invalid token.', 401);
  }
}
