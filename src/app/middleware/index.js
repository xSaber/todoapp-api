import { isEmpty } from 'lodash';

export const error = (error, req, res, next) => {
  console.info('INSIDE ERROR MIDDLEWARE');

  if (error instanceof Error) {
    const statusCode = error.status || 500;

    res.status(statusCode).send({
      error: {
        status : statusCode,
        message: error.message
      }
    });

    return;
  }

  next(error);
};

export const json = (req, res, next) => {
  console.info('INSIDE JSON MIDDLEWARE');

  const { data } = res.locals;

  if (!data) {
    res.sendStatus(204);
  } else {
    res.status(200).send({ data });
  }

  next();
};
