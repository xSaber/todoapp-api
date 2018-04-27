export default (func) => async (...args) => {
  // This hack with `...` operator is done for variable arguments number
  const next = args[2];

  try {
    await func(...args);
  } catch (e) {
    next(e);
  }
};
