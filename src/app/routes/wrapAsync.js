export default (func) => async (req, res, next) => {
  try {
    await func(req, req, next);
  } catch (e) {
    next(e);
  }
};
