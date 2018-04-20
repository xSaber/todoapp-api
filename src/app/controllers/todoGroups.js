import models from '../../database/models';

export const todoGroupsController = {

    /**
     * Adds a new TodoGroup
     */
    create (req, res) {
        return models.TodoGroup
            .create({ title : req.body.title })
            .then(todoGroup => res.status(201).send({ todoGroup }))
            .catch(error => res.status(400).send(error));
    },

    /**
     * Gets a list of Todos
     */
    list (req, res, next) {
        return models.TodoGroup
            .findAll()
            // .then(todoGroups => res.status(200).send({ todoGroups }))
            .then(todoGroups => {
              res.locals.data = { todoGroups };
              next();
            })
            .catch(error => res.status(400).send(error));
    },

    /**
     * Retrieves a certain Todo
     */
    get (req, res) {
        return models.TodoGroup
            .findById(req.params.todoGroupId)
            .then(todoGroup => {
                if (!todoGroup) {
                    return res.status(404).send({
                        message : 'TodoGroup Not Found',
                    });
                }
                return res.status(200).send({ todoGroup });
            })
            .catch(error => res.status(400).send(error));
    },

    /**
     * Updates Todo
     */
    update (req, res) {
        return models.TodoGroup
            .findById(req.params.todoGroupId)
            .then(todoGroup => {
                if (!todoGroup) {
                    return res.status(404).send({
                        message : 'TodoGroup Not Found',
                    });
                }

                return todoGroup
                    .update({ title : req.body.title || todo.title })
                    .then(() => res.status(200).send({ todoGroup }))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    /**
     * Removes Todo
     */
    remove (req, res) {
        return models.TodoGroup
            .findById(req.params.todoGroupId)
            .then(todoGroup => {
                if (!todoGroup) {
                    return res.status(400).send({
                        message : 'Todo Not Found',
                    });
                }
                return todoGroup
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },
};
