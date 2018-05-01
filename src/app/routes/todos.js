const Router = require('express').Router;
const todosController = require('../controllers').todosController;
const getTodo = require('../middleware').getTodo;
const wrapAsync = require('./wrapAsync');

module.exports = Router({ mergeParams: true })
  .param('todoId', wrapAsync(getTodo))
  .post('/', wrapAsync(todosController.create))
  .get('/', wrapAsync(todosController.index))
  .patch('/:todoId', wrapAsync(todosController.update))
  .put('/:todoId', wrapAsync(todosController.update))
  .delete('/:todoId', wrapAsync(todosController.destroy));
