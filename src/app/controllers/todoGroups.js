import models from '../../database/models';
import { NotFoundError } from '../errors';

const findById = async (id) => {
  const todoGroup = await models.TodoGroup.findById(id);

  if (!todoGroup) {
    throw new NotFoundError('Todo group not found');
  }

  return todoGroup;
};

export default {
  async create (req, res, next) {
    const { title } = req.body.todoGroup;

    try {
      const todoGroup = await models.TodoGroup.create({ title });
      res.status(200).send({ todoGroup });
    } catch (e) {
      next(e);
    }
  },

  async index (req, res, next) {
    const todoGroups = await models.TodoGroup.findAll();

    res.status(200).send({ todoGroups });
  },

  async show (req, res, next) {
    try {
      const todoGroup = await findById(req.params.todoGroupId);
      res.status(200).send({ todoGroup });
    } catch (e) {
      next(e);
    }
  },

  async update (req, res, next) {
    const todoGroup = await findById(req.params.todoGroupId);
    const title = req.body.todoGroup.title || todoGroup.title;

    try {
      const updatedTodoGroup = await todoGroup.update({ title });
      res.status(200).send({ todoGroup: updatedTodoGroup });
    } catch (e) {
      next(e);
    }
  },

  async destroy (req, res, next) {
    const todoGroup = await findById(req.params.todoGroupId);

    try {
      await todoGroup.destroy();
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
};
