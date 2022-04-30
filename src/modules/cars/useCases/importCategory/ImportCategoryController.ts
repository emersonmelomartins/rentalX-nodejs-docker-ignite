import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AppError } from '@shared/errors/AppError';
import { ImportCategoryUseCase } from './ImportCategoryUseCase';

class ImportCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;
    const importCategoryUseCase = container.resolve(ImportCategoryUseCase);
    if (!file) throw new AppError('File is required');

    await importCategoryUseCase.execute(file);
    return response.status(201).send();
  }
}

export { ImportCategoryController };
