const error = require('./error');
const notFound = require('./notFound');
const getEntity = require('./getEntity');

module.exports = {
  error,
  notFound,
  ...getEntity
};
