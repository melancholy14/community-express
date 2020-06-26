import { Request, Response } from 'express';
import HttpException from '../common/http-exception';

export const errorHandler = (
  error: HttpException,
  _request: Request,
  response: Response,
) => {
  const status = error.statusCode || 500;
  const message =
    error.message || 'It is not you. It is use. We are having some problems.';

  response.status(status).send(message);
};
