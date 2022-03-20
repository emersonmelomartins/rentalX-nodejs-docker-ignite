import { Category } from '../../models/Category';
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from '../ICategoriesRepository';

class CategoriesRepository implements ICategoriesRepository {
  private categories: Category[];

  // Padrão Singleton -> essa classe irá possuir apenas uma instância
  private static INSTANCE: CategoriesRepository;

  // Transforma o construtor em privado para nao ser chamado "new"
  private constructor() {
    this.categories = [];
  }

  public static getInstance(): CategoriesRepository {
    // Caso não exista uma instancia, ou seja, a primeira chamada da classe
    // Cria uma nova instancia, se não retorna a existente
    if (!CategoriesRepository.INSTANCE) {
      CategoriesRepository.INSTANCE = new CategoriesRepository();
    }

    return CategoriesRepository.INSTANCE;
  }

  create({ name, description }: ICreateCategoryDTO): void {
    const category = new Category({
      name,
      description,
    });

    this.categories.push(category);
  }

  list(): Category[] {
    return this.categories;
  }

  findByName(name: string): Category | undefined {
    const one = this.categories.find(
      (category: Category) => category.name === name
    );
    return one;
  }
}

export { CategoriesRepository };
