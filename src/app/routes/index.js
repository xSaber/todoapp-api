import { todoGroupsController, todosController } from '~/app/controllers';

export default (app, express, controllers) => {
  /**
	 *
	 * 1. Define routes for routers depending on the entity
	 *
	 * 2. Consider on using router.param method to fetch entity before hitting the controller
	 *
	 * 3. Organize middleware for each route
	 *
	 * 4. After all above done -> go somewhere together to discuss how can we add mappers and refactor
	 * 		routes definition logics
	 *
	 */

  const rootRouter = express.Router();
  app.use('/', rootRouter);

  const apiV1Router = express.Router();
  rootRouter.use('/api/v1', apiV1Router);

  const todoGroupsRouter = express.Router();
  todoGroupsRouter.post('/', todoGroupsController.create);
  todoGroupsRouter.get('/', todoGroupsController.index);
  todoGroupsRouter.get('/:todoGroupId', todoGroupsController.show);
  todoGroupsRouter.patch('/:todoGroupId', todoGroupsController.update);
  todoGroupsRouter.put('/:todoGroupId', todoGroupsController.update);
  todoGroupsRouter.delete('/:todoGroupId', todoGroupsController.destroy);
  apiV1Router.use('/todo-groups', todoGroupsRouter);

  const todosRouter = express.Router({ mergeParams: true });
  todosRouter.post('/', todosController.create);
  todosRouter.get('/', todosController.index);
  todosRouter.patch('/:todoId', todosController.update);
  todosRouter.put('/:todoId', todosController.update);
  todosRouter.delete('/:todoId', todosController.update);
  todoGroupsRouter.use('/:todoGroupId/todos', todosRouter);
};
