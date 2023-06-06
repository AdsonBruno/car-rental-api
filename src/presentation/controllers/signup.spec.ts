import { SignUpController } from './signup';

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
    expect(httResponse.body).toEqual(new Error('Missing param: name'));
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
    expect(httResponse.body).toEqual(new Error('Missing param: email'));
  });
});
