import { SignUpController } from './signup';
import {
  MissingParamsError,
  InvalidParamError,
  ServerError,
} from '../../errors';
import {
  EmailValidator,
  AccountModel,
  AddAccount,
  AddAccountModel,
} from './signup-protocols';

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }

  return new EmailValidatorStub();
};

const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    add(account: AddAccountModel): AccountModel {
      const fakeAccount = {
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email@mail.com',
        password: 'valid_password',
        profileImage: 'valid_image.png',
      };
      return fakeAccount;
    }
  }

  return new AddAccountStub();
};

interface SutTypes {
  sut: SignUpController;
  emailValidatorStub: EmailValidator;
  addAccountStub: AddAccount;
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator();
  const addAccountStub = makeAddAccount();
  const sut = new SignUpController(emailValidatorStub, addAccountStub);
  return {
    sut,
    emailValidatorStub,
    addAccountStub,
  };
};

describe('SignUp Controller', () => {
  test('Should return 400 if no name', () => {
    const { sut } = makeSut();
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

  test('Should return 400 if no email is provide', () => {
    const { sut } = makeSut();
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

  test('Should return 400 if no password is provide', () => {
    const { sut } = makeSut();
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

  test('Should return 400 if no password confirmation is provide', () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        profileImage: 'any_image.png',
      },
    };
    const httResponse = sut.handle(httpRequest);
    expect(httResponse.statusCode).toBe(400);
    expect(httResponse.body).toEqual(
      new MissingParamsError('passwordConfirmation')
    );
  });

  test('Should return 400 if password confirmation fails', () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'invalid_password',
        profileImage: 'any_image.png',
      },
    };
    const httResponse = sut.handle(httpRequest);
    expect(httResponse.statusCode).toBe(400);
    expect(httResponse.body).toEqual(
      new InvalidParamError('passwordConfirmation')
    );
  });

  test('Should not return an error if no image is provide', () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(201);
    expect(httpResponse.body).toEqual({
      message: 'User created sucessfully',
      account: {
        email: 'valid_email@mail.com',
        id: 'valid_id',
        name: 'valid_name',
        password: 'valid_password',
        profileImage: 'valid_image.png',
      },
    });
  });

  test('Should return 201 if an image is provide', () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        profileImage: 'any_image.png',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(201);
    expect(httpResponse.body).toEqual({
      message: 'User created sucessfully',
      profileImage: 'any_image.png',
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
      passwordConfirmation: 'any_password',
    });
  });

  test('Should return 400 if an invalid email is provide', () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false);
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'invalid_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        profileImage: 'any_image.png',
      },
    };
    const httResponse = sut.handle(httpRequest);
    expect(httResponse.statusCode).toBe(400);
    expect(httResponse.body).toEqual(new InvalidParamError('email'));
  });

  test('Should call EmailValidator with correct email', () => {
    const { sut, emailValidatorStub } = makeSut();
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid');
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        profileImage: 'any_image.png',
      },
    };

    sut.handle(httpRequest);
    expect(isValidSpy).toHaveBeenCalledWith('any_email@mail.com');
  });

  test('Should return 500 if EmailValidator throws', () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error();
    });
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        profileImage: 'any_image.png',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  test('Should call AddAccount with correct values', () => {
    const { sut, addAccountStub } = makeSut();
    const addSpy = jest.spyOn(addAccountStub, 'add');
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        profileImage: 'valid_image.png',
      },
    };
    sut.handle(httpRequest);
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    });
  });

  test('Should return 500 if AddAccount throws', () => {
    const { sut, addAccountStub } = makeSut();
    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(() => {
      throw new Error();
    });
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        profileImage: 'any_image.png',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  test('Should return 200 if valid data is provided', () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'invalid_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        profileImage: 'valid_image.png',
      },
    };
    const httResponse = sut.handle(httpRequest);
    expect(httResponse.statusCode).toBe(200);
    expect(httResponse.body).toEqual({
      account: {
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email@mail.com',
        password: 'valid_password',
        profileImage: 'valid_image.png',
      },
    });
  });
});
