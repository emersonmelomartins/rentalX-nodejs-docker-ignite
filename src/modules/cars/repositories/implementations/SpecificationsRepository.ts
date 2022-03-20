import { Specification } from '../../models/Specification';
import {
  ISpecificationsRepository,
  ICreateSpecificationDTO,
} from '../ISpecificationsRepository';

class SpecificationsRepository implements ISpecificationsRepository {
  private specifications: Specification[];

  private static INSTANCE: SpecificationsRepository;

  private constructor() {
    this.specifications = [];
  }

  public static getInstance(): SpecificationsRepository {
    if (!SpecificationsRepository.INSTANCE) {
      SpecificationsRepository.INSTANCE = new SpecificationsRepository();
    }

    return SpecificationsRepository.INSTANCE;
  }

  create({ name, description }: ICreateSpecificationDTO): void {
    const specification = new Specification({ name, description });

    this.specifications.push(specification);
  }

  findByName(name: string): Specification | undefined {
    const specification = this.specifications.find(
      (spec) => spec.name === name
    );

    return specification;
  }
}

export { SpecificationsRepository };
