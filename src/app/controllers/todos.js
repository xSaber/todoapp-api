import models from '../../database/models';

export const todosController = {

  /**
   * Adds Todo
   */
  create(req, res, next) {
    const { content } = req.body.todo;
    const { todoGroupId } = req.params;

    return models.Todo
      .create({
        todoGroupId,
        content
      })
      .then(todo => {
        res.locals.data = { todo };
        next();
      })
      .catch(error => res.status(500).send(error));
  },

  /**
   * Gets all Todos
   */
  index(req, res, next) {
    return models.Todo
      .findAll({
        where: {
          todoGroupId: req.params.todoGroupId
        }
      })
      .then(todos => {
        res.locals.data = { todos };
        next();
      })
      .catch(error => res.status(500).send(error));
  },

  /**
   * Updates Todo
   */
  update(req, res, next) {
    return models.Todo
      .findById(req.params.todoId)
      .then(todo => {
        if (!todo) {
          return res.status(404).send({ message: 'Todo not found' });
        }

        return todo;
      })
      .then(todo => todo.update({ complete: !todo.complete }))
      .then(updatedTodo => {
        res.locals.data = { todo: updatedTodo };
        next();
      })
      .catch(error => res.status(500).send(error));
  },

  /**
   * Removes Todo
   */
  destroy(req, res, next) {
    return models.Todo
      .find({ where: { id: req.params.todoId } })
      .then(todo => {
        if (!todo) {
          return res.status(404).send({ message: 'Todo not found' });
        }

        return todo;
      })
      .then((todo) => todo.destroy())
      .then(() => res.status(204).send())
      .catch(error => res.status(500).send(error));
  }
};
