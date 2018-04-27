import { Router } from 'express';
import { todosController } from '~/app/controllers';
import wrapAsync from '~/app/routes/wrapAsync';

export default Router({ mergeParams: true })
  .post('/', wrapAsync(todosController.create))
  .get('/', wrapAsync(todosController.index))
  .patch('/:todoId', wrapAsync(todosController.update))
  .put('/:todoId', wrapAsync(todosController.update))
  .delete('/:todoId', wrapAsync(todosController.update));
