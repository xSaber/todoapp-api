import { todoGroupsController, todosController } from '../controllers';
import mappers from '../mappers'

export const routes = (app, express) => {
  const todoGroups = express.Router();
  const todos = express.Router({ mergeParams: true });

  app.use('/api/todo-groups', todoGroups);
  todoGroups.use('/:todoGroupId/todos', todos);

  const routes = [
    { route: '/',             method: 'post',   entity: todos,      handler: todosController.create,     mapper: mappers.todos.mapOne  },
    { route: '/',             method: 'get',    entity: todos,      handler: todosController.list,       mapper: mappers.todos.mapMany },
    { route: '/:todoId',      method: 'put',    entity: todos,      handler: todosController.update,     mapper: mappers.todos.mapOne  },
    { route: '/:todoId',      method: 'delete', entity: todos,      handler: todosController.remove,     mapper: mappers.todos.mapOne  },
    { route: '/',             method: 'get',    entity: todoGroups, handler: todoGroupsController.list   },
    { route: '/',             method: 'post',   entity: todoGroups, handler: todoGroupsController.create },
    { route: '/:todoGroupId', method: 'get',    entity: todoGroups, handler: todoGroupsController.get    },
    { route: '/:todoGroupId', method: 'put',    entity: todoGroups, handler: todoGroupsController.update },
    { route: '/:todoGroupId', method: 'delete', entity: todoGroups, handler: todoGroupsController.remove }
  ]

  routes.forEach((config) => {
    const { entity, method, route, handler, mapper } = config;

    entity[method](route, handler, (req, res) => {
      if (!mapper) {
        res.status(200).send(res.locals.data)
        return
      }

      res.status(200).send(mapper(res.locals.data))
    });
  });
};
