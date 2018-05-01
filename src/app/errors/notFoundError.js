const AppError = require('./appError');

class NotFoundError extends AppError {
  constructor(message) {
    super(message);
    this.code = 404;
  }
}

module.exports = NotFoundError;
