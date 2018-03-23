import models from '../../database/models';

export const todosController = {

    /**
     * Adds a new Todo
     */
    create (req, res) {
        return models.Todo
            .create({ title : req.body.title })
            .then(todo => res.status(201).send(todo))
            .catch(error => res.status(400).send(error));
    },

    /**
     * Gets a list of Todos
     */
    list (req, res) {
        return models.Todo
            .findAll({
                include : [{
                    model : models.TodoItem,
                    as    : 'todoItems',
                }],
            })
            .then(todos => res.status(200).send(todos))
            .catch(error => res.status(400).send(error));
    },

    /**
     * Retrieves a certain Todo
     */
    retrieve (req, res) {
        return models.Todo
            .findById(req.params.todoId, {
                include : [{
                    model : models.TodoItem,
                    as    : 'todoItems',
                }],
            })
            .then(todo => {
                if (!todo) {
                    return res.status(404).send({
                        message : 'Todo Not Found',
                    });
                }
                return res.status(200).send(todo);
            })
            .catch(error => res.status(400).send(error));
    },

    /**
     * Updates Todo
     */
    update (req, res) {
        return models.Todo
            .findById(req.params.todoId, {
                include : [{
                    model : models.TodoItem,
                    as    : 'todoItems',
                }],
            })
            .then(todo => {
                if (!todo) {
                    return res.status(404).send({
                        message : 'Todo Not Found',
                    });
                }
                return todo
                    .update({
                        title : req.body.title || todo.title,
                    })
                    .then(() => res.status(200).send(todo))  // Send back the updated todo.
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    /**
     * Removes Todo
     */
    destroy (req, res) {
        return models.Todo
            .findById(req.params.todoId)
            .then(todo => {
                if (!todo) {
                    return res.status(400).send({
                        message : 'Todo Not Found',
                    });
                }
                return todo
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },
};
