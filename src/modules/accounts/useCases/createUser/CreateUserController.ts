import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const data = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    try {
      await createUserUseCase.execute(data);

      return response.status(201).send();
    } catch (err) {
      return response.status(400).json({ error: (err as Error).message });
    }
  }
}

export { CreateUserController };
