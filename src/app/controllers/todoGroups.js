import models from '../../database/models';
import { todoGroups as mapper } from '../mappers';
import { NotFoundError } from '../errors';

export default {
  async create (req, res, next) {
    const { title } = req.body.todoGroup;
    const todoGroup = await models.TodoGroup.create({ title });
    const data = mapper.mapOne(todoGroup);

    res.status(200).send({ data });
  },

  async index (req, res, next) {
    const todoGroups = await models.TodoGroup.findAll();
    const data = mapper.mapMany(todoGroups);

    res.status(200).send({ data });
  },

  async show (req, res, next) {
    const todoGroup = await findById(req.params.todoGroupId);
    const data = mapper.mapOne(todoGroup);

    res.status(200).send({ data });
  },

  async update (req, res, next) {
    const todoGroup = await findById(req.params.todoGroupId);
    const title = req.body.todoGroup.title || todoGroup.title;
    const updatedTodoGroup = await todoGroup.update({ title });
    const data = mapper.mapOne(updatedTodoGroup);

    res.status(200).send({ data });
  },

  async destroy (req, res, next) {
    const todoGroup = await findById(req.params.todoGroupId);
    await todoGroup.destroy();

    res.sendStatus(204);
  }
};

const findById = async (id) => {
  const todoGroup = await models.TodoGroup.findById(id);

  if (!todoGroup) {
    throw new NotFoundError('Todo group not found');
  }

  return todoGroup;
};
