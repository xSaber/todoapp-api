import models from '../../database/models';

export const todosController = {

  /**
   * Adds Todo
   */
  create(req, res) {
    return models.Todo
      .create({
        content: req.body.content,
        todoGroupId: req.params.todoGroupId,
      })
      .then(todo => res.status(201).send({ todo }))
      .catch(error => res.status(400).send(error));
  },

/**
 * Get all Todos
 */
  list(req, res) {
    return models.Todo
      .findAll({
        where: {
          todoGroupId: req.params.todoGroupId
        }
      })
      .then(todos => {
        res.locals.data = { todos }
        next()
      })
      .catch(error => res.status(500).send(error));
  },

  /**
   * Updates Todo
   */
  update(req, res) {
    return models.Todo
      .find({
        where: {
          id: req.params.todoId
        }
      })
      .then(todo => {
        if (!todo) {
          return res.status(404).send({ message: 'Todo Not Found' });
        }

        return todo
          .update({
            content: req.body.content || todo.content,
            complete: req.body.complete || todo.complete,
          })
          .then(updatedTodo => res.status(200).send(updatedTodo))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

  /**
   * Removes Todo
   */
  remove(req, res) {
    return models.Todo
      .find({
        where: {
          id: req.params.todoId
        }
      })
      .then(todo => {
        if (!todo) {
          return res.status(404).send({
            message: 'Todo Not Found',
          });
        }

        return todo
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
};
