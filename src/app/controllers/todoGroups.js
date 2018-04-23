import models from '../../database/models';
import NotFoundError from '../errors/notFoundError';

const findById = async (id) => {
  const todoGroup = await models.TodoGroup.findById(id);

  if (!todoGroup) {
    throw new NotFoundError('Todo group not found');
  }

  return todoGroup;
};

export const todoGroupsController = {
  /**
   * Adds a new Todo Group
   */
  async create (req, res, next) {
    const { title } = req.body.todoGroup;
    const todoGroup = await models.TodoGroup.create({ title });

    res.locals.data = { todoGroup };
    next();
  },

  /**
   * Gets a list of Todo Groups
   */
  async index (req, res, next) {
    const todoGroups = await models.TodoGroup.findAll();

    res.locals.data = { todoGroups };
    next();
  },

  /**
   * Retrieves a certain Todo Group
   */
  async show (req, res, next) {
    const todoGroup = await findById(req.params.todoGroupId);

    res.locals.data = { todoGroup };
    next();
  },

  /**
   * Updates Todo Groups
   */
  async update (req, res, next) {
    const todoGroup = await findById(req.params.todoGroupId);
    const { title } = req.body.todoGroup || todoGroup.title;
    const updatedTodoGroup = await todoGroup.update({ title });

    res.locals.data = { todoGroup: updatedTodoGroup };
    next();
  },

  /**
   * Removes Todo Groups
   */
  async destroy (req, res, next) {
    const todoGroup = await findById(req.params.todoGroupId);
    await todoGroup.destroy();

    res.locals.data = {};
    next();
  }
};
