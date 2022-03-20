import { v4 as uuid } from 'uuid';

interface ICategoryArgsConstructor {
  name: string;
  description: string;
}

class Category {
  id?: string;

  name: string;

  description: string;

  created_at?: Date;

  constructor({ name, description }: ICategoryArgsConstructor) {
    if (!this.id) {
      this.id = uuid();
    }
    this.name = name;
    this.description = description;
    this.created_at = new Date();
  }
}

export { Category };
