import models from '../../database/models';
import { NotFoundError } from '../errors';

export const todosController = {
  async create(req, res, next) {
    const { content } = req.body.todo;
    const { todoGroupId } = req.params;
    const todo = await models.Todo.create({ todoGroupId, content });

    res.locals.data = { todo };
    next();
  },

  async index(req, res, next) {
    const todos = await models.Todo.findAll({
      where: { todoGroupId: req.params.todoGroupId }
    });

    res.locals.data = { todos };
    next();
  },

  async update(req, res, next) {
    const todo = await models.Todo.findById(req.params.todoId);

    if (!todo) {
      throw new NotFoundError('Todo not found');
    }

    const { complete } = req.body.todo;
    const updatedTodo = await todo.update({ complete });

    res.locals.data = { todo: updatedTodo };
    next();
  },

  async destroy(req, res, next) {
    const todo = await models.Todo.find({
      where: { id: req.params.todoId }
    });

    if (!todo) {
      throw new NotFoundError('Todo not found');
    }

    await todo.destroy();

    res.locals.data = {};
    next();
  }
};
