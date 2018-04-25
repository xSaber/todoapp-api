import AppError from './appError';

export default class NotFoundError extends AppError {
  constructor(message) {
    super(message);
    this.code = 404;
  }
}
