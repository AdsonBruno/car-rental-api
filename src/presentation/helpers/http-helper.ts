import { ServerError } from '../errors/server-error';
import { HttpResponse } from '../protocols/http';

export const created = (
  message: string,
  profileImage?: string
): HttpResponse => {
  const responseBody = { profileImage };

  if (profileImage) {
    responseBody.profileImage = profileImage;
    return {
      statusCode: 201,
      body: { message, profileImage },
    };
  }

  return {
    statusCode: 201,
    body: { message },
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
