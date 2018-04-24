import models from '../../database/models';
import { todoGroups as todoGroupsMapper } from '../mappers';
import { NotFoundError } from '../errors';

export default {

  async create (req, res, next) {
    try {
      const { title } = req.body.todoGroup;
      const todoGroup = await models.TodoGroup.create({ title });
      const data = todoGroupsMapper.mapOne(todoGroup);

      res.status(200).send({ data });
    } catch (e) {
      next(e);
    }
  },

  async index (req, res, next) {
    try {
      const todoGroups = await models.TodoGroup.findAll();
      const data = todoGroupsMapper.mapMany(todoGroups);

      res.status(200).send({ data });
    } catch (e) {
      next(e)
    }
  },

  async show (req, res, next) {
    try {
      const todoGroup = await findById(req.params.todoGroupId);
      const data = todoGroupsMapper.mapOne(todoGroup);

      res.status(200).send({ data });
    } catch (e) {
      next(e);
    }
  },

  async update (req, res, next) {
    try {
      const todoGroup = await findById(req.params.todoGroupId);
      const title = req.body.todoGroup.title || todoGroup.title;
      const updatedTodoGroup = await todoGroup.update({ title });
      const data = todoGroupsMapper.mapOne(updatedTodoGroup);

      res.status(200).send({ data });
    } catch (e) {
      next(e);
    }
  },

  async destroy (req, res, next) {
    try {
      const todoGroup = await findById(req.params.todoGroupId);
      await todoGroup.destroy();
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
};

const findById = async (id) => {
  const todoGroup = await models.TodoGroup.findById(id);

  if (!todoGroup) {
    throw new NotFoundError('Todo group not found');
  }

  return todoGroup;
};
