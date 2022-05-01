import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUsersRepository } from '../IUsersRepository';

class InMemoryUsersRepository implements IUsersRepository {
  users: User[] = [];

  async create({
    driver_license,
    email,
    name,
    password,
  }: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, {
      driver_license,
      email,
      name,
      password,
    });

    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find((usr) => usr.email === email);

    return user;
  }

  async findById(id: string): Promise<User | undefined> {
    const user = this.users.find((usr) => usr.id === id);

    return user;
  }
}

export { InMemoryUsersRepository };
