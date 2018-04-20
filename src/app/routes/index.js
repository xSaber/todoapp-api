import { todoGroupsController, todosController } from '../controllers';

export const routes = (app, express) => {

  const todoGroups = express.Router();
  const todos = express.Router({ mergeParams: true });

  let postRender = (req, res) => {
    res.status(200).send({ ...res.locals.data });
  }

  app.use('/api/todo-groups', todoGroups);
  todoGroups.use('/:todoGroupId/todos', todos);

  const routes = [
    { route: '/',             method: 'post',   entity: todos,      handler: todosController.create      },
    { route: '/',             method: 'get',    entity: todos,      handler: todosController.list,       },
    { route: '/:todoId',      method: 'put',    entity: todos,      handler: todosController.update      },
    { route: '/:todoId',      method: 'delete', entity: todos,      handler: todosController.remove      },

    { route: '/',             method: 'get',    entity: todoGroups, handler: todoGroupsController.list, postRender: postRender   },
    { route: '/',             method: 'post',   entity: todoGroups, handler: todoGroupsController.create },
    { route: '/:todoGroupId', method: 'get',    entity: todoGroups, handler: todoGroupsController.get    },
    { route: '/:todoGroupId', method: 'put',    entity: todoGroups, handler: todoGroupsController.update },
    { route: '/:todoGroupId', method: 'delete', entity: todoGroups, handler: todoGroupsController.remove }
  ]

  routes.forEach((config) => {
    const { entity, method, route, handler } = config;
    entity[method](route, handler, postRender);
  });

};
