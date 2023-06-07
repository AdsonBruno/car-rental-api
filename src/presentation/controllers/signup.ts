import { MissingParamsError } from '../errors/missing-params-error';
import { HttpResponse, HttpRequest } from '../protocols/http';
import { badRequest } from '../helpers/http-helper';

export class SignUpController {
  handle(httpRequest: HttpRequest): HttpResponse {
    const requiredField = ['name', 'email', 'password', 'passwordConfirmation'];
    for (const field of requiredField) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamsError(field));
      }
    }
  }
}
