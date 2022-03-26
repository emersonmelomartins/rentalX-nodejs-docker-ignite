import { v4 as uuid } from 'uuid';

class Specification {
  id?: string;

  name: string;

  description: string;

  created_at?: Date;

  constructor({ name, description }: Omit<Specification, 'id'>) {
    if (!this.id) {
      this.id = uuid();
    }
    this.name = name;
    this.description = description;
    this.created_at = new Date();
  }
}

export { Specification };
