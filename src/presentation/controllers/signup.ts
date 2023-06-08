import { MissingParamsError } from '../errors/missing-params-error';
import { HttpResponse, HttpRequest } from '../protocols/http';
import { badRequest, created } from '../helpers/http-helper';
import { Controller } from '../protocols/controller';
import { EmailValidator } from '../protocols/email-validator';
import { InvalidParamError } from '../errors/invalid-param-erros';
import { ServerError } from '../errors/server-error';

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator;

  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator;
  }

  handle(httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredField = [
        'name',
        'email',
        'password',
        'passwordConfirmation',
      ];
      for (const field of requiredField) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamsError(field));
        }
      }

      const isValid = this.emailValidator.isValid(httpRequest.body.email);
      if (!isValid) {
        return badRequest(new InvalidParamError('email'));
      }
      const { profileImage } = httpRequest.body;

      if (profileImage) {
        return created('User created sucessfully', profileImage);
      } else {
        return created('User created sucessfully');
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: new ServerError(),
      };
    }
  }
}
