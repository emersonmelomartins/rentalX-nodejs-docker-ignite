import dayjs from 'dayjs';
import { InMemoryRentalsRepository } from '@modules/rentals/repositories/in-memory/InMemoryRentalsRepository';
import { AppError } from '@shared/errors/AppError';
import { CreateRentalUseCase } from './CreateRentalUseCase';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';

describe('Create Rental', () => {
  let createRentalUseCase: CreateRentalUseCase;
  let inMemoryRentalsRepository: InMemoryRentalsRepository;

  let dayjsDateProvider: DayjsDateProvider;

  const dayAdd24Hours = dayjs().add(1, 'day').toDate();

  beforeEach(() => {
    inMemoryRentalsRepository = new InMemoryRentalsRepository();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      inMemoryRentalsRepository,
      dayjsDateProvider
    );
  });

  it('should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      user_id: '1234',
      car_id: '4321',
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not be able to create a new rental if user already have an open rental', () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '1234',
        car_id: '4321',
        expected_return_date: dayAdd24Hours,
      });

      await createRentalUseCase.execute({
        user_id: '1234',
        car_id: '43213',
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental if car already have an open rental', () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '1234',
        car_id: '4321',
        expected_return_date: dayAdd24Hours,
      });

      await createRentalUseCase.execute({
        user_id: '4321',
        car_id: '4321',
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental with expected return time less than 24h', () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '1234',
        car_id: '4321',
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
