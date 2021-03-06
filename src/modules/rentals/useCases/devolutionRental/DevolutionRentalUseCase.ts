import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,

    @inject('CarsRepository')
    private carsRepository: ICarsRepository,

    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider
  ) {}
  async execute({ id, user_id }: IRequest): Promise<Rental> {
    const MIN_DAILY = 1;

    const rental = await this.rentalsRepository.findById(id);

    if (!rental) {
      throw new AppError('Rental not found.', 404);
    }

    if(rental.end_date) {
      throw new AppError(`This rent already ended at ${rental.end_date.toLocaleDateString()}`)
    }

    const car = await this.carsRepository.findById(rental.car_id);

    if (!rental) {
      throw new AppError('Rental does not exists.');
    }

    const dateNow = this.dateProvider.dateNow();

    // Verificação diária
    let daily = this.dateProvider.compareInDays(rental.start_date, dateNow);

    if (daily < 1) {
      daily = MIN_DAILY;
    }

    // Verificação atraso
    const delay = this.dateProvider.compareInDays(
      dateNow,
      rental.expected_return_date
    );

    // Soma diária com atraso
    let total = 0;

    if (delay > 0) {
      const calculateFine = delay * car.fine_amount;
      total = calculateFine;
    }

    total += daily * car.daily_rate;

    rental.end_date = dateNow;
    rental.total = total;

    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailable(car.id, true);

    return rental;
  }
}

export { DevolutionRentalUseCase };
