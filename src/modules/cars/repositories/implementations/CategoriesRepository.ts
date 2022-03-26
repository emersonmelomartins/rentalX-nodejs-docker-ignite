import { getRepository, Repository } from 'typeorm';
import { Category } from '../../entities/Category';
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from '../ICategoriesRepository';

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  // Padrão Singleton -> essa classe irá possuir apenas uma instância
  // private static INSTANCE: CategoriesRepository;

  // Transforma o construtor em privado para nao ser chamado "new"
  // e ser possivel utilizar o singleton
  constructor() {
    this.repository = getRepository(Category);
  }

  // public static getInstance(): CategoriesRepository {
  //   // Caso não exista uma instancia, ou seja, a primeira chamada da classe
  //   // Cria uma nova instancia, se não retorna a existente
  //   if (!CategoriesRepository.INSTANCE) {
  //     CategoriesRepository.INSTANCE = new CategoriesRepository();
  //   }

  //   return CategoriesRepository.INSTANCE;
  // }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      description,
      name,
    });
    await this.repository.save(category);
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find();
    return categories;
  }

  async findByName(name: string): Promise<Category | undefined> {
    const category = await this.repository.findOne({ name });

    return category;
  }
}

export { CategoriesRepository };
