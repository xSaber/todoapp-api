import models from '../../database/models';

export const todoGroupsController = {

	/**
     * Adds a new Todo Group
     */
	create (req, res, next) {
		const { title } = req.body.todoGroup;

		return models.TodoGroup
			.create({ title })
			.then(todoGroup => {
				res.locals.data = { todoGroup };
				next();
			})
			.catch(error => res.status(500).send(error));
	},

	/**
     * Gets a list of Todo Groups
     */
	index (req, res, next) {
		return models.TodoGroup
			.findAll()
			.then(todoGroups => {
				res.locals.data = { todoGroups };
				next();
			})
			.catch(error => res.status(500).send(error));
	},

	/**
     * Retrieves a certain Todo Group
     */
	show (req, res, next) {
		return models.TodoGroup
			.findById(req.params.todoGroupId)
			.then(todoGroup => {
				if (!todoGroup) {
					return res.status(404).send({ messages: 'Todo group not found' });
				}

				res.locals.data = { todoGroup };
				next();
			})
			.catch(error => res.status(500).send(error));
	},

	/**
     * Updates Todo Groups
     */
	update (req, res, next) {
		return models.TodoGroup
			.findById(req.params.todoGroupId)
			.then(todoGroup => {
				if (!todoGroup) {
					return res.status(404).send({ message: 'Todo group not found' });
				}

				return todoGroup;
			})
			.then(todoGroup => todoGroup.update({ title: req.body.title || todoGroup.title }))
			.then(updatedTodoGroup => {
				res.locals.data = { todoGroup: updatedTodoGroup };
				next();
			})
			.catch(error => res.status(500).send(error));
	},

	/**
     * Removes Todo Groups
     */
	destroy (req, res, next) {
		return models.TodoGroup
			.findById(req.params.todoGroupId)
			.then(todoGroup => {
				if (!todoGroup) {
					return res.status(404).send({ message: 'Todo group not found' });
				}

				return todoGroup;
			})
			.then((todoGroup) => todoGroup.destroy())
			.then(() => res.status(204).send())
			.catch(error => res.status(500).send(error));
	}
};
