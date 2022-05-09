import { InMemoryCarsRepository } from '@modules/cars/repositories/in-memory/InMemoryCarsRepository';
import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

describe('List Available Cars', () => {
  let inMemoryCarsRepository: InMemoryCarsRepository;
  let listAvailableCarsUseCase: ListAvailableCarsUseCase;

  beforeEach(() => {
    inMemoryCarsRepository = new InMemoryCarsRepository();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      inMemoryCarsRepository
    );
  });

  it('should be able to list all available cars', async () => {
    const car = await inMemoryCarsRepository.create({
      brand: 'Car brand 1',
      category_id: 'some_category_id',
      daily_rate: 123,
      description: 'Car description 1.',
      fine_amount: 321,
      license_plate: 'ABC-1231',
      name: 'Car name 1',
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          available: true,
        }),
      ])
    );
  });

  it('should be able to list all available cars by brand', async () => {
    const car = await inMemoryCarsRepository.create({
      brand: 'Car brand 2',
      category_id: 'some_category_id',
      daily_rate: 123,
      description: 'Car description 2.',
      fine_amount: 321,
      license_plate: 'ABC-1231',
      name: 'Car name 2',
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: 'Car brand 2',
    });

    expect(cars).toEqual([car]);

    expect(cars).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          brand: 'Car brand 2',
        }),
      ])
    );
  });

  it('should be able to list all available cars by name', async () => {
    const car = await inMemoryCarsRepository.create({
      brand: 'Car brand 2',
      category_id: 'some_category_id',
      daily_rate: 123,
      description: 'Car description 2.',
      fine_amount: 321,
      license_plate: 'ABC-1231',
      name: 'Car name 3',
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: 'Car name 3',
    });

    expect(cars).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Car name 3',
        }),
      ])
    );
  });

  it('should be able to list all available cars by category id', async () => {
    const car = await inMemoryCarsRepository.create({
      brand: 'Car brand 2',
      category_id: 'some_category_id_2',
      daily_rate: 123,
      description: 'Car description 2.',
      fine_amount: 321,
      license_plate: 'ABC-1231',
      name: 'Car name 2',
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: 'some_category_id_2',
    });

    expect(cars).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          category_id: 'some_category_id_2',
        }),
      ])
    );
  });
});
