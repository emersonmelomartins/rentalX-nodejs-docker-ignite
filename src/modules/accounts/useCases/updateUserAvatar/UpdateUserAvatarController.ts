import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateUserAvatarUseCase } from './UpdateUserAvatarUseCase';

class UpdateUserAvatarController {
  async handle(request: Request, response: Response) {
    const { id: user_id } = request.user;

    // Receber arquivo
    const avatar_file = 'null';

    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);

    await updateUserAvatarUseCase.execute({ user_id, avatar_file });

    return response.status(204).send();
  }
}

export { UpdateUserAvatarController };
