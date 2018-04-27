import { Router } from 'express';
import { todosController } from '~/app/controllers';
import * as middleware from '~/app/middleware';
import wrapAsync from '~/app/routes/wrapAsync';

export default Router({ mergeParams: true })
  .param('todoId', wrapAsync(middleware.getTodo))
  .post('/', wrapAsync(todosController.create))
  .get('/', wrapAsync(todosController.index))
  .patch('/:todoId', wrapAsync(todosController.update))
  .put('/:todoId', wrapAsync(todosController.update))
  .delete('/:todoId', wrapAsync(todosController.destroy));
