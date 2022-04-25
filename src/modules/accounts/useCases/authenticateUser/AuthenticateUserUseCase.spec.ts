import { AppError } from '@errors/AppError';
import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { InMemoryUsersRepository } from '@modules/accounts/repositories/in-memory/InMemoryUsersRepository';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

describe('Authenticate User', () => {
  let authenticateUserUseCase: AuthenticateUserUseCase;
  let inMemoryUsersRepository: InMemoryUsersRepository;
  let createUserUseCase: CreateUserUseCase;

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      inMemoryUsersRepository
    );
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
  });

  it('should authenticate a user', async () => {
    const user: ICreateUserDTO = {
      driver_license: '12345',
      email: 'user@mail.com',
      password: 'xpto',
      name: 'User Test',
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('token');
  });

  it('should not authenticate a non-existent user', () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'some.random_mail@gmail.com',
        password: 'some_pass123',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not authenticate with incorrect password', () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: '11111',
        email: 'user2@mail.com',
        password: '1234',
        name: 'User Test 2',
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: 'incorrect_password',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
