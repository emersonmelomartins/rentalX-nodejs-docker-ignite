import { getRepository, Repository } from 'typeorm';
import { Rental } from '../entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return await this.repository.findOne({
      where: {
        car_id,
        end_date: null,
      },
    });
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return await this.repository.findOne({
      where: {
        user_id,
        end_date: null,
      },
    });
  }
  async create({
    car_id,
    expected_return_date,
    user_id,
    end_date,
    id,
    total,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      car_id,
      expected_return_date,
      user_id,
      end_date,
      id,
      total,
    });

    await this.repository.save(rental);

    return rental;
  }

  async findById(id: string): Promise<Rental> {
    return await this.repository.findOne({ id });
  }

  async findAllByUser(user_id: string): Promise<Rental[]> {
    return await this.repository.find({
      where: {
        user_id,
      },
      // relacionamento feito na Entity "Rental", atributo "car"
      // contém JoinColumn e OneToOne
      relations: ["car"]
    });
  }
}

export { RentalsRepository };
