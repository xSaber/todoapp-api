import initDefineResource from './defineResource';

export default (app, express, controllers) => {
  const defineResource = initDefineResource(app, express, controllers);

	const routerOptions = { mergeParams: true };

	const rootRouter = express.Router();
	const todoGroupsRouter = express.Router(routerOptions);
	const todosRouter = express.Router(routerOptions);

	app.use('/api/v1', rootRouter); // main router, should be parent for all routers

	rootRouter.use('/todo-groups/:todoGroupId', todoGroupsRouter);
	todoGroupsRouter.use('/todos/:todoId', todoGroupsRouter);


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



  // defineResource({
  //   name      : 'todoGroup',
  //   namespaces: ['api', 'v1']
  // });
	//
  // defineResource({
  //   name      : 'todo',
  //   parentName: 'todoGroup',
  //   actions   : ['index', 'create', 'update', 'destroy']
  // });

};
