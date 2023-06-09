import { AccountModel } from '../controllers/signup/signup-protocols';
import { ServerError } from '../errors/server-error';
import { HttpResponse } from '../protocols/http';

export const created = (
  account: AccountModel,
  profileImage?: string
): HttpResponse => {
  const responseBody = { ...account };

  if (profileImage) {
    return {
      statusCode: 200,
      body: { account: responseBody },
    };
  }

  return {
    statusCode: 200,
    body: { account },
  };
};

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error,
});

export const serverError = (): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(),
});
