const models = require('../../database/models');
const mapper = require('../mappers').todoGroups;
const NotFoundError = require('../errors').NotFoundError;

module.exports = {
  async create (req, res, next) {
    const { title } = req.body.todo;
    const { todoGroupId } = req.params;
    const todo = await models.Todo.create({ todoGroupId, content: title });
    const data = mapper.mapOne(todo);

    res.status(200).send({ data });
  },

  async index(req, res, next) {
    const todos = await models.Todo.findAll({
      where: { todoGroupId: req.params.todoGroupId },
      order: [['createdAt', 'DESC']]
    });

    const data = mapper.mapMany(todos);

    res.status(200).send({ data });
  },

  async update(req, res, next) {
    const todo = res.locals.todo;
    const complete = req.body.todo.complete || todo.complete;
    const updatedTodo = await todo.update({ complete });

    const data = mapper.mapOne(updatedTodo);

    res.status(200).send({ data });
  },

  async destroy(req, res, next) {
    const todo = res.locals.todo;

    await todo.destroy();

    res.sendStatus(204);
  }
};
