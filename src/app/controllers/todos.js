import models from '../../database/models';

export const todosController = {

  /**
   * Adds Todo
   */
  async create(req, res, next) {
    const { content } = req.body.todo;
    const { todoGroupId } = req.params;
    const todo = await models.Todo.create({ todoGroupId, content });
    next({ todo });
  },

  /**
   * Gets all Todos
   */
  async index(req, res, next) {
    const todos = await models.Todo.findAll({ where: { todoGroupId: req.params.todoGroupId } });
    next({ todos });
  },

  /**
   * Updates Todo
   */
  async update(req, res, next) {
    const todo = await models.Todo.findById(req.params.todoId);
    if (!todo) {
      return res.status(404).send({ message: 'Todo not found' });
    }
    const { complete } = req.body.todo;
    const updatedTodo = await todo.update({ complete });
    next({ todo: updatedTodo });
  },

  /**
   * Removes Todo
   */
  async destroy(req, res, next) {
    const todo = await models.Todo.find({ where: { id: req.params.todoId } });
    if (!todo) {
      return res.status(404).send({ message: 'Todo not found' });
    }
    await todo.destroy();
    next({});
  }
};
