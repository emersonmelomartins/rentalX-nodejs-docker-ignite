import { InMemoryCarsRepository } from '@modules/cars/repositories/in-memory/InMemoryCarsRepository';
import { InMemorySpecificationsRepository } from '@modules/cars/repositories/in-memory/InMemorySpecificationsRepository';
import { AppError } from '@shared/errors/AppError';
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

describe('Create Car Specification', () => {
  let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
  let inMemoryCarsRepository: InMemoryCarsRepository;
  let inMemorySpecificationsRepository: InMemorySpecificationsRepository;

  beforeEach(() => {
    inMemoryCarsRepository = new InMemoryCarsRepository();
    inMemorySpecificationsRepository = new InMemorySpecificationsRepository();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      inMemoryCarsRepository,
      inMemorySpecificationsRepository
    );
  });

  it('should not be able to add a new specification to a non-existing car', async () => {
    const car_id = '123';
    const specifications_id = ['321', '543'];

    await expect(
      createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      })
    ).rejects.toEqual(new AppError('Car does not exists.', 404));
  });

  it('should be able to add a new specification to the car', async () => {
    const car = await inMemoryCarsRepository.create({
      brand: 'Car Brand',
      category_id: null,
      daily_rate: 123,
      description: 'A nice car',
      fine_amount: 321,
      license_plate: 'ABC-123',
      name: 'Nice Car',
    });

    const specification = await inMemorySpecificationsRepository.create({
      name: 'Spec 1',
      description: 'Spec 1 description',
    });

    const car_id = car.id;
    const specifications_id = [specification.id];

    const specificationsCars = await createCarSpecificationUseCase.execute({
      car_id,
      specifications_id,
    });

    expect(specificationsCars).toHaveProperty('specifications');
    expect(specificationsCars.specifications.length).toBe(1);
  });
});
