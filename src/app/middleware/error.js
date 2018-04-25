export default (error, req, res, next) => {
  if (!(error instanceof Error )) {
    next(error);
  }

  const statusCode = error.code || 500;
  console.warn(error);

  res.status(statusCode).send({
    error: {
      code   : statusCode,
      message: error.message
    }
  });
};
