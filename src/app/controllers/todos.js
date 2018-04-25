import models from '../../database/models';
import { todos as mapper } from '../mappers';
import { NotFoundError } from '../errors';

export default {

  async create(req, res, next) {
    try {
      const { title } = req.body.todo;
      const { todoGroupId } = req.params;
      const todo = await models.Todo.create({ todoGroupId, content: title });
      const data = mapper.mapOne(todo);

      res.status(200).send({ data });
    } catch (e) {
      next(e);
    }
  },

  async index(req, res, next) {
    try {
      const todoGroup = await models.TodoGroup.find({
        where  : { id: req.params.todoGroupId },
        include: [{ model: models.Todo, as: 'todos' }]
      });

      if (!todoGroup) {
        throw new NotFoundError('Todo Group not found');
      }

      const data = mapper.mapMany(todoGroup.todos);

      res.status(200).send({ data });
    } catch (e) {
      next(e);
    }
  },

  async update(req, res, next) {
    try {
      const todo = await findById(req.params.todoId);

      const { complete } = req.body.todo;
      const updatedTodo = await todo.update({ complete });

      const data = mapper.mapOne(updatedTodo);

      res.status(200).send({ data });
    } catch (e) {
      next(e);
    }
  },

  async destroy(req, res, next) {
    try {
      const todo = await findById(req.params.todoId);

      await todo.destroy();

      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
};

const findById = async (id) => {
  const todo = await models.Todo.findById(id);

  if (!todo) {
    throw new NotFoundError('Todo not found');
  }

  return todo;
};
