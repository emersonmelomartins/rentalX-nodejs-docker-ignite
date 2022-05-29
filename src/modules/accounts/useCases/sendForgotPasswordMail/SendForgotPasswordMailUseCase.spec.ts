import { InMemoryUsersRepository } from '@modules/accounts/repositories/in-memory/InMemoryUsersRepository';
import { InMemoryUsersTokensRepository } from '@modules/accounts/repositories/in-memory/InMemoryUsersTokensRepository';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { IMailProvider } from '@shared/container/providers/MailProvider/IMailProvider';
import { InMemoryMailProvider } from '@shared/container/providers/MailProvider/in-memory/InMemoryMailProvider';
import { AppError } from '@shared/errors/AppError';
import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

describe('Send forgot password mail', () => {
  let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
  let inMemoryUsersRepository: InMemoryUsersRepository;
  let inMemoryUsersTokensRepository: InMemoryUsersTokensRepository;
  let dateProvider: DayjsDateProvider;
  let mailProvider: IMailProvider;

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryUsersTokensRepository = new InMemoryUsersTokensRepository();
    dateProvider = new DayjsDateProvider();
    mailProvider = new InMemoryMailProvider();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      inMemoryUsersRepository,
      inMemoryUsersTokensRepository,
      dateProvider,
      mailProvider
    );
  });

  it('should be able to send a forgot password mail to user', async () => {
    const sendMailSpy = jest.spyOn(mailProvider, 'sendMail');

    await inMemoryUsersRepository.create({
      driver_license: '1234',
      email: 'emerson25xd@gmail.com',
      name: 'Emerson',
      password: '1234',
    });

    await sendForgotPasswordMailUseCase.execute('emerson25xd@gmail.com');

    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('should not be able to send mail if user does not exists', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute('emerson25xd@gmail.com')
    ).rejects.toEqual(new AppError('User does not exists.'));
  });

  it('should be able to create an users token', async () => {
    const generateTokenMailSpy = jest.spyOn(
      inMemoryUsersTokensRepository,
      'create'
    );

    await inMemoryUsersRepository.create({
      driver_license: '1234',
      email: 'emerson25xd@gmail.com',
      name: 'Emerson',
      password: '1234',
    });

    await sendForgotPasswordMailUseCase.execute('emerson25xd@gmail.com');

    expect(generateTokenMailSpy).toHaveBeenCalled();
  });
});
