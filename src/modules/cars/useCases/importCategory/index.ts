import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';
import { ImportCategoryController } from './ImportCategoryController';
import { ImportCategoryUseCase } from './ImportCategoryUseCase';

export function importCategoryController(): ImportCategoryController {
  const categoriesRepository = new CategoriesRepository();
  const importCategoryUseCase = new ImportCategoryUseCase(categoriesRepository);
  const controller = new ImportCategoryController(importCategoryUseCase);

  return controller;
}
