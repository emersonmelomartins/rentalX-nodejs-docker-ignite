import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListCategoriesUseCase } from './ListCategoriesUseCase';

class ListCategoriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listCategoriesUseCase = container.resolve(ListCategoriesUseCase);

    try {
      const categories = await listCategoriesUseCase.execute();
      return response.status(200).json(categories);
    } catch (error) {
      return response.status(400).json({ error: (error as Error).message });
    }
  }
}

export { ListCategoriesController };
