import { AppError } from '../../../../errors/AppError';
import { InMemoryCategoriesRepository } from '../../repositories/in-memory/InMemoryCategoriesRepository';
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
    expect(async () => {
      const category = {
        name: 'Category Test',
        description: 'Category test description',
      };

      await createCategoryUseCase.execute(category);
      await createCategoryUseCase.execute(category);
    }).rejects.toBeInstanceOf(AppError);
  });
});
