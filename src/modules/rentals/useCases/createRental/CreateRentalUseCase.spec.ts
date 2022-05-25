import dayjs from 'dayjs';
import { InMemoryRentalsRepository } from '@modules/rentals/repositories/in-memory/InMemoryRentalsRepository';
import { AppError } from '@shared/errors/AppError';
import { CreateRentalUseCase } from './CreateRentalUseCase';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { InMemoryCarsRepository } from '@modules/cars/repositories/in-memory/InMemoryCarsRepository';

describe('Create Rental', () => {
  let createRentalUseCase: CreateRentalUseCase;
  let inMemoryCarsRepository: InMemoryCarsRepository;
  let inMemoryRentalsRepository: InMemoryRentalsRepository;

  let dayjsDateProvider: DayjsDateProvider;

  const dayAdd24Hours = dayjs().add(1, 'day').toDate();

  beforeEach(() => {
    inMemoryRentalsRepository = new InMemoryRentalsRepository();
    inMemoryCarsRepository = new InMemoryCarsRepository();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      inMemoryRentalsRepository,
      dayjsDateProvider,
      inMemoryCarsRepository
    );
  });

  it('should be able to create a new rental', async () => {
    const car = await inMemoryCarsRepository.create({
      name: 'Test',
      description: 'Car test',
      brand: 'Car brand',
      category_id: null,
      daily_rate: 11.1,
      fine_amount: 22.2,
      license_plate: 'ABC-123',
    });

    const rental = await createRentalUseCase.execute({
      user_id: '1234',
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not be able to create a new rental if user already have an open rental', async () => {
    const car = await inMemoryCarsRepository.create({
      name: 'Test',
      description: 'Car test',
      brand: 'Car brand',
      category_id: null,
      daily_rate: 11.1,
      fine_amount: 22.2,
      license_plate: 'ABC-123',
    });

    const car2 = await inMemoryCarsRepository.create({
      name: 'Test 2',
      description: 'Car test 2',
      brand: 'Car brand 2',
      category_id: null,
      daily_rate: 11.1,
      fine_amount: 22.2,
      license_plate: 'ABC-123',
    });

    await createRentalUseCase.execute({
      user_id: '1234',
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: '1234',
        car_id: car2.id,
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(
      new AppError('Theres a rental in progress for this user.')
    );
  });

  it('should not be able to create a new rental if car already have an open rental', async () => {
    const car = await inMemoryCarsRepository.create({
      name: 'Test',
      description: 'Car test',
      brand: 'Car brand',
      category_id: null,
      daily_rate: 11.1,
      fine_amount: 22.2,
      license_plate: 'ABC-123',
    });

    await createRentalUseCase.execute({
      user_id: '1234',
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: '4321',
        car_id: car.id,
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError('Car is unavailable to rent.'));
  });

  it('should not be able to create a new rental with expected return time less than 24h', async () => {
    await expect(
      createRentalUseCase.execute({
        user_id: '1234',
        car_id: '4321',
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(new AppError('Invalid expected return date'));
  });
});
