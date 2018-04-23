export default class AppError extends Error {
  constructor(message) {
    super(message);
    this.status = 500;
  }
}
