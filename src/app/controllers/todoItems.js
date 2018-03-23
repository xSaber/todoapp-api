import models from '../../database/models';

export const todoItemsController = {

    /**
     * Adds TodoItem
     */
    create (req, res) {
        return models.TodoItem
            .create({
                content : req.body.content,
                todoId  : req.params.todoId,
            })
            .then(todoItem => res.status(201).send(todoItem))
            .catch(error => res.status(400).send(error));
    },

    /**
     * Updates TodoItem
     */
    update (req, res) {
        return models.TodoItem
            .find({
                where : {
                    id     : req.params.todoItemId,
                    todoId : req.params.todoId,
                },
            })
            .then(todoItem => {
                if (!todoItem) {
                    return res.status(404).send({
                        message : 'TodoItem Not Found',
                    });
                }
                return todoItem
                    .update({
                        content  : req.body.content || todoItem.content,
                        complete : req.body.complete || todoItem.complete,
                    })
                    .then(updatedTodoItem => res.status(200).send(updatedTodoItem))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },

    /**
     * Removes TodoItem
     */
    destroy (req, res) {
        return models.TodoItem
            .find({
                where : {
                    id     : req.params.todoItemId,
                    todoId : req.params.todoId,
                },
            })
            .then(todoItem => {
                if (!todoItem) {
                    return res.status(404).send({
                        message : 'TodoItem Not Found',
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
