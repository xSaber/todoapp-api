import { Router } from 'express';
import { todosController } from '~/app/controllers';

export default Router({ mergeParams: true })
  .post('/', todosController.create)
  .get('/', todosController.index)
  .patch('/:todoId', todosController.update)
  .put('/:todoId', todosController.update)
  .delete('/:todoId', todosController.update);
