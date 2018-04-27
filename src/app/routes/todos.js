import { Router } from 'express';
import { todosController } from '~/app/controllers';

const todosRouter = Router({ mergeParams: true });

todosRouter.post('/', todosController.create);
todosRouter.get('/', todosController.index);
todosRouter.patch('/:todoId', todosController.update);
todosRouter.put('/:todoId', todosController.update);
todosRouter.delete('/:todoId', todosController.update);

export default todosRouter;
