import { isEmpty } from 'lodash';
import { NotFoundError } from '../errors';

export const error = (error, req, res, next) => {
  if (error instanceof Error) {
    const statusCode = error.code || 500;

    res.status(statusCode).send({
      error: {
        code   : statusCode,
        message: error.message
      }
    });

    return;
  }

  next(error);
};

export const notFound = (req, res, next) => {
  const error = new NotFoundError('Page not found');
  next(error);
};
