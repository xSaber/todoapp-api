import { todoGroupsController, todosController } from '../controllers';

export const routes = (app) => {

    // TodoGroups endpoints
    app.get('/api/todo-groups', todoGroupsController.list);
    app.get('/api/todo-groups/:todoGroupId', todoGroupsController.get);
    app.post('/api/todo-groups', todoGroupsController.create);
    app.put('/api/todo-groups/:todoGroupId', todoGroupsController.update);
    app.delete('/api/todo-groups/:todoGroupId', todoGroupsController.remove);

    // Todos endpoints
    app.post('/api/todo-groups/:todoGroupId/todos', todosController.create);
    app.get('/api/todo-groups/:todoGroupId/todos', todosController.index);
    // app.put('/api/todos/:todoId/items/:todoItemId', todoItemsController.update);
    // app.delete('/api/todos/:todoId/items/:todoItemId', todoItemsController.destroy);

    // Authentication endpoints
    // app.post('/api/signup', usersController.create);
};
