import models from '../../database/models';

export const todoGroupsController = {

  /**
   * Adds a new Todo Group
   */
  async create (req, res, next) {
    const { title } = req.body.todoGroup;
    const todoGroup = await models.TodoGroup.create({ title });
    next({ todoGroup });
  },

  /**
   * Gets a list of Todo Groups
   */
  async index (req, res, next) {
    const todoGroups = await models.TodoGroup.findAll();
    next({ todoGroups });
  },

  /**
   * Retrieves a certain Todo Group
   */
  async show (req, res, next) {
    const todoGroup = await models.TodoGroup.findById(req.params.todoGroupId);
    if (!todoGroup) {
      return res.status(404).send({ messages: 'Todo group not found' });
    }
    next({ todoGroup });
  },

  /**
   * Updates Todo Groups
   */
  async update (req, res, next) {
    const todoGroup = await models.TodoGroup.findById(req.params.todoGroupId);
    if (!todoGroup) {
      return res.status(404).send({ message: 'Todo group not found' });
    }
    const { title } = req.body.todoGroup || todoGroup.title;
    const updatedTodoGroup = await todoGroup.update({ title });
    next({ todoGroup: updatedTodoGroup });
  },

  /**
   * Removes Todo Groups
   */
  async destroy (req, res, next) {
    const todoGroup = await models.TodoGroup.findById(req.params.todoGroupId);
    if (!todoGroup) {
      return res.status(404).send({ message: 'Todo group not found' });
    }
    await todoGroup.destroy();
    next({});
  }
};
