import { NotFoundError } from '~/app/errors';

export default (req, res, next) => {
  const error = new NotFoundError('Page not found');
  next(error);
};
