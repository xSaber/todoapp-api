const Router = require('express').Router;
const todoGroupsController = require('../controllers').todoGroupsController;
const getTodoGroup = require('../middleware').getTodoGroup;
const wrapAsync = require('./wrapAsync');

module.exports = Router()
  // this is basically pretty interesting, however, this route.param will get called from now on
  // /todo endpoints as well, not sure if it is required for shallow routes
  .param('todoGroupId', wrapAsync(getTodoGroup))
  .post('/', wrapAsync(todoGroupsController.create))
  .get('/', wrapAsync(todoGroupsController.index))
  .get('/:todoGroupId', wrapAsync(todoGroupsController.show))
  .patch('/:todoGroupId', wrapAsync(todoGroupsController.update))
  .put('/:todoGroupId', wrapAsync(todoGroupsController.update))
  .delete('/:todoGroupId', wrapAsync(todoGroupsController.destroy));
