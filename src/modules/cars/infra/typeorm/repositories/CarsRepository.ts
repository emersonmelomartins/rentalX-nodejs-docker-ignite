import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { getRepository, Repository } from 'typeorm';
import { Car } from '../entities/Car';

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }
  findByLicensePlate(license_plate: string): Promise<Car> {
    throw new Error('Method not implemented.');
  }

  create(data: ICreateCarDTO): Promise<Car> {
    throw new Error('Method not implemented.');
  }
}

export { CarsRepository };
