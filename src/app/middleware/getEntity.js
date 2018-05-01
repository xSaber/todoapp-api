const models = require('../../database/models');
const NotFoundError = require('../errors').NotFoundError;

const getTodoGroup = async (req, res, next, id) => {
  const todoGroup = await models.TodoGroup.findById(id);

  if (!todoGroup) {
    throw new NotFoundError('Todo Group not found');
  }

  res.locals.todoGroup = todoGroup;
  next();
};

const getTodo = async (req, res, next, id) => {
  const todo = await models.Todo.findById(id);

  if (!todo) {
    throw new NotFoundError('Todo not found');
  }

  res.locals.todo = todo;
  next();
};

module.exports = {
  getTodoGroup,
  getTodo
};
