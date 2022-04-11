import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { password, email } = request.body;

    try {
      const authenticateUserUseCase = container.resolve(
        AuthenticateUserUseCase
      );

      const authenticateInfo = await authenticateUserUseCase.execute({
        password,
        email,
      });

      return response.status(200).json(authenticateInfo);
    } catch (err) {
      return response.status(401).json({ error: (err as Error).message });
    }
  }
}

export { AuthenticateUserController };
