import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ImportCategoryUseCase } from './ImportCategoryUseCase';

class ImportCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;
    const importCategoryUseCase = container.resolve(ImportCategoryUseCase);

    try {
      if (!file)
        return response.status(400).json({ error: 'File is required' });

      await importCategoryUseCase.execute(file);
      return response.send();
    } catch (error) {
      return response.status(400).json({ error: (error as Error).message });
    }
  }
}

export { ImportCategoryController };
