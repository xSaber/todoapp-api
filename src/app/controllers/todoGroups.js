import models from '../../database/models';

export const todoGroupsController = {

    /**
     * Adds a new TodoGroup
     */
    create (req, res, next) {
      const { title } = req.body.todoGroup

      return models.TodoGroup
        .create({ title })
        .then(todoGroup => {
          res.locals.data = { todoGroup }
          next()
        })
        .catch(error => res.status(500).send(error))
    },

    /**
     * Gets a list of Todos
     */
    list (req, res, next) {
      return models.TodoGroup
        .findAll()
        .then(todoGroups => {
          res.locals.data = { todoGroup }
          next()
        })
        .catch(error => res.status(500).send(error))
    },

    /**
     * Retrieves a certain Todo
     */
    get (req, res, next) {
      return models.TodoGroup
        .findById(req.params.todoGroupId)
        .then(todoGroup => {
          if (!todoGroup) {
            return res.status(404).send({ messages: 'Todo group not found' })
          }

          res.locals.data = { todoGroup }
          next()
        })
        .catch(error => res.status(500).send(error))
    },

    /**
     * Updates Todo Groups
     */
    update (req, res, next) {
      return models.TodoGroup
        .findById(req.params.todoGroupId)
        .then(todoGroup => {
          if (!todoGroup) {
            return res.status(404).send({ message: 'Todo group not found' })
          }

          return todoGroup
            .update({ title: req.body.title || todoGroup.title })
            .then(updatedTodoGroup => {
              res.locals.data = { todoGroup: updatedTodoGroup }
              next()
            })
            .catch(error => res.status(500).send(error))
        })
        .catch(error => res.status(500).send(error))
    },

    /**
     * Removes Todo
     */
    remove (req, res, next) {
      return models.TodoGroup
        .findById(req.params.todoGroupId)
        .then(todoGroup => {
          if (!todoGroup) {
            return res.status(404).send({ message: 'Todo group not found' })
          }

          return todoGroup
            .destroy()
            .then(() => res.status(204).send())
            .catch(error => res.status(500).send(error))
        })
        .catch(error => res.status(500).send(error))
    },
};
