import models from '../../database/models';
import { NotFoundError } from '../errors';

export const getTodoGroup = async (req, res, next, id) => {
  const todoGroup = await models.TodoGroup.findById(id);

  if (!todoGroup) {
    throw new NotFoundError('Todo Group not found');
  }

  res.locals.todoGroup = todoGroup;
  next();
}

export const getTodo = async (req, res, next, id) => {
  const todo = await models.Todo.findById(id);

  if (!todo) {
    throw new NotFoundError('Todo not found');
  }

  res.locals.todo = todo;
  next();
}
