import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AppError } from '../../../../errors/AppError';
import { UpdateUserAvatarUseCase } from './UpdateUserAvatarUseCase';

class UpdateUserAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;

    const { file } = request;

    // Receber arquivo
    if (!file) {
      throw new AppError('Avatar file required.');
    }
    const avatar_file = file.filename;

    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);

    await updateUserAvatarUseCase.execute({ user_id, avatar_file });

    return response.status(204).send();
  }
}

export { UpdateUserAvatarController };
