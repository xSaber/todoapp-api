const models = require('../../database/models');
const mapper = require('../mappers').todos;
const NotFoundError = require('../errors').NotFoundError;

module.exports = {
  async create (req, res, next) {
    const { title } = req.body.todoGroup;
    const todoGroup = await models.TodoGroup.create({ title });
    const data = mapper.mapOne(todoGroup);

    res.status(200).send({ data });
  },

  async index (req, res, next) {
    const todoGroups = await models.TodoGroup.findAll({
      order: [['createdAt', 'DESC']]
    });

    const data = mapper.mapMany(todoGroups);

    res.status(200).send({ data });
  },

  async show (req, res, next) {
    const data = mapper.mapOne(res.locals.todoGroup);

    res.status(200).send({ data });
  },

  async update (req, res, next) {
    const todoGroup = res.locals.todoGroup;
    const title = req.body.todoGroup.title || todoGroup.title;
    const updatedTodoGroup = await todoGroup.update({ title });
    const data = mapper.mapOne(updatedTodoGroup);

    res.status(200).send({ data });
  },

  async destroy (req, res, next) {
    const todoGroup = res.locals.todoGroup;
    await todoGroup.destroy();

    res.sendStatus(204);
  }
};
