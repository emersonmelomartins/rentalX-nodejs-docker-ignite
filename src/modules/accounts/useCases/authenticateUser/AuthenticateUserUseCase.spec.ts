import { AppError } from '@shared/errors/AppError';
import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { InMemoryUsersRepository } from '@modules/accounts/repositories/in-memory/InMemoryUsersRepository';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';
import { InMemoryUsersTokensRepository } from '@modules/accounts/repositories/in-memory/InMemoryUsersTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';

describe('Authenticate User', () => {
  let authenticateUserUseCase: AuthenticateUserUseCase;
  let inMemoryUsersRepository: InMemoryUsersRepository;
  let createUserUseCase: CreateUserUseCase;
  let inMemoryUsersTokensRepository: InMemoryUsersTokensRepository;
  let dateProvider: IDateProvider;

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryUsersTokensRepository = new InMemoryUsersTokensRepository();
    dateProvider = new DayjsDateProvider();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      inMemoryUsersRepository,
      inMemoryUsersTokensRepository,
      dateProvider
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

  it('should not authenticate a non-existent user', async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: 'some.random_mail@gmail.com',
        password: 'some_pass123',
      })
    ).rejects.toEqual(new AppError('Email or password incorrect.'));
  });

  it('should not authenticate with incorrect password', async () => {
    const user: ICreateUserDTO = {
      driver_license: '11111',
      email: 'user2@mail.com',
      password: '1234',
      name: 'User Test 2',
    };

    await createUserUseCase.execute(user);

    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: 'incorrect_password',
      })
    ).rejects.toEqual(new AppError('Email or password incorrect.'));
  });
});
