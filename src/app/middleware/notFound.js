const NotFoundError = require('../errors');

module.exports = (req, res, next) => {
  const error = new NotFoundError('Page not found');
  next(error);
};
