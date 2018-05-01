// NOTE: This is an abstract error, it should not be instantiated
// we can use it somewhere to distinguish it from other types of errors

class AppError extends Error {
  constructor(message) {
    super(message);
    this.code = 500;
  }
}

module.exports = AppError;
