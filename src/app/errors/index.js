export class AppError extends Error {
  constructor(message) {
    super(message);
    this.code = 500;
  }
}

export class NotFoundError extends AppError {
  constructor(message) {
    super(message);
    this.code = 404;
  }
}
