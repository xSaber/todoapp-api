import { isEmpty } from 'lodash';

export const error = (error, req, res, next) => {
  if (!error) {
    return next();
  }

  console.info('INSIDE ERROR MIDDLEWARE');

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

export const notFound = (req, res, next) => res.status(404).send({
  error: {
    code   : 404,
    message: 'Page not found'
  }
});
