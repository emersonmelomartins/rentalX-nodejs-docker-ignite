import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';
import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from '../ISpecificationsRepository';

class InMemorySpecificationsRepository implements ISpecificationsRepository {
  specifications: Specification[] = [];

  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
    });

    this.specifications.push(specification);

    return specification;
  }

  async findByName(name: string): Promise<Specification> {
    const specification = this.specifications.find((s) => s.name === name);

    return specification;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const specs = this.specifications.filter((s) => ids.includes(s.id));

    return specs;
  }
}

export { InMemorySpecificationsRepository };
