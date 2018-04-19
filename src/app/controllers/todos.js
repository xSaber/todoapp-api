import models from '../../database/models';

export const todosController = {

  /**
   * Adds TodoItem
   */
  create(req, res) {
    console.log(req.params)
    return models.Todo
      .create({
        content: req.body.content,
        todoGroupId: +req.params.todoGroupId,
      })
      .then(todo => res.status(201).send(todo))
      .catch(error => res.status(400).send(error));
  },

  index(req, res) {
    return models.Todo
      .find({
        where: {
          todoGroupId: +req.params.todoGroupId
        }
      })
      .then(todos => res.status(201).send(todos))
      .catch(error => res.status(400).send(error));
  },

  /**
   * Updates TodoItem
   */
  update(req, res) {
    return models.TodoItem
      .find({
        where: {
          id: req.params.todoItemId,
          todoId: req.params.todoId,
        },
      })
      .then(todoItem => {
        if (!todoItem) {
          return res.status(404).send({
            message: 'TodoItem Not Found',
          });
        }
        return todoItem
          .update({
            content: req.body.content || todoItem.content,
            complete: req.body.complete || todoItem.complete,
          })
          .then(updatedTodoItem => res.status(200).send(updatedTodoItem))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

  /**
   * Removes TodoItem
   */
  destroy(req, res) {
    return models.TodoItem
      .find({
        where: {
          id: req.params.todoItemId,
          todoId: req.params.todoId,
        },
      })
      .then(todoItem => {
        if (!todoItem) {
          return res.status(404).send({
            message: 'TodoItem Not Found',
          });
        }
        return todoItem
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
};
