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
  });
});
