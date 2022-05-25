import { InMemoryCarsRepository } from '@modules/cars/repositories/in-memory/InMemoryCarsRepository';
import { AppError } from '@shared/errors/AppError';
import { CreateCarUseCase } from './CreateCarUseCase';

describe('Create Car', () => {
  let createCarUseCase: CreateCarUseCase;
  let inMemoryCarsRepository: InMemoryCarsRepository;

  beforeEach(() => {
    inMemoryCarsRepository = new InMemoryCarsRepository();
    createCarUseCase = new CreateCarUseCase(inMemoryCarsRepository);
  });

  it('should create a new car.', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car name',
      description: 'Car description',
      daily_rate: 100,
      license_plate: 'ABC1234',
      fine_amount: 60,
      brand: 'Car brand',
      category_id: 'category_id',
    });

    expect(car).toHaveProperty('id');
  });

  it('should not create car if license plate already exists.', async () => {
    await createCarUseCase.execute({
      name: 'Car 1',
      description: 'Car description',
      daily_rate: 100,
      license_plate: 'ABC1234',
      fine_amount: 60,
      brand: 'Car brand',
      category_id: 'category_id',
    });

    await expect(
      createCarUseCase.execute({
        name: 'Car 2',
        description: 'Car description',
        daily_rate: 100,
        license_plate: 'ABC1234',
        fine_amount: 60,
        brand: 'Car brand',
        category_id: 'category_id',
      })
    ).rejects.toEqual(
      new AppError('Car with license plate informed already exists.')
    );
  });

  it('should create a car with availability true by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car Available',
      description: 'Car description',
      daily_rate: 100,
      license_plate: 'ABC1234',
      fine_amount: 60,
      brand: 'Car brand',
      category_id: 'category_id',
    });

    expect(car.available).toBeTruthy();
  });
});
