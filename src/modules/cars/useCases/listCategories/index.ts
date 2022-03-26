import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';
import { ListCategoriesController } from './ListCategoriesController';
import { ListCategoriesUseCase } from './ListCategoriesUseCase';

export function listCategoriesController(): ListCategoriesController {
  const categoriesRepository = new CategoriesRepository();
  const listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepository);
  const controller = new ListCategoriesController(listCategoriesUseCase);

  return controller;
}
