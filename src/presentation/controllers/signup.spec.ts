import { SignUpController } from './signup';
import { MissingParamsError } from '../errors/missing-params-error';

describe('SignUp Controller', () => {
  test('Shoul return 400 if no name', () => {
    const sut = new SignUpController();
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        profileImage: 'any_image.png',
      },
    };
    const httResponse = sut.handle(httpRequest);
    expect(httResponse.statusCode).toBe(400);
    expect(httResponse.body).toEqual(new MissingParamsError('name'));
  });

  test('Shoul return 400 if no email is provide', () => {
    const sut = new SignUpController();
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        profileImage: 'any_image.png',
      },
    };
    const httResponse = sut.handle(httpRequest);
    expect(httResponse.statusCode).toBe(400);
    expect(httResponse.body).toEqual(new MissingParamsError('email'));
  });

  test('Shoul return 400 if no password is provide', () => {
    const sut = new SignUpController();
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        passwordConfirmation: 'any_password',
        profileImage: 'any_image.png',
      },
    };
    const httResponse = sut.handle(httpRequest);
    expect(httResponse.statusCode).toBe(400);
    expect(httResponse.body).toEqual(new MissingParamsError('password'));
  });
});
