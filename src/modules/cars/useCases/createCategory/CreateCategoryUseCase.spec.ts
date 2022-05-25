import { AppError } from '@shared/errors/AppError';
import { InMemoryCategoriesRepository } from '@modules/cars/repositories/in-memory/InMemoryCategoriesRepository';

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

describe('Category', () => {
  let createCategoryUseCase: CreateCategoryUseCase;
  let inMemoryCategoryUseCase: InMemoryCategoriesRepository;

  beforeEach(() => {
    inMemoryCategoryUseCase = new InMemoryCategoriesRepository();
    createCategoryUseCase = new CreateCategoryUseCase(inMemoryCategoryUseCase);
  });

  it('should create a new category', async () => {
    const category = {
      name: 'Category Test',
      description: 'Category test description',
    };

    await createCategoryUseCase.execute(category);

    const result = await inMemoryCategoryUseCase.findByName(category.name);

    expect(result).toHaveProperty('id');
  });

  it('should not create a new category with existing name', async () => {
    const category = {
      name: 'Category Test',
      description: 'Category test description',
    };

    await createCategoryUseCase.execute(category);

    await expect(createCategoryUseCase.execute(category)).rejects.toEqual(
      new AppError('Category already exists.')
    );
  });
});
