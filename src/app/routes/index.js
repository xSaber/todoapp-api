/**
 *
 * 1. Define routes for routers depending on the entity ✅
 *
 * 2. Consider on using router.param method to fetch entity before hitting the controller
 *
 * 3. Organize middleware for each route
 *
 * 4. After all above done -> go somewhere together to discuss how can we add mappers and refactor
 * 		routes definition logics
 *
 */

const Router = require('express').Router;
const todoGroupsRouter = require('./todoGroups');
const todosRouter = require('./todos');

const rootRouter = Router();

rootRouter.use('/todo-groups', todoGroupsRouter);
todoGroupsRouter.use('/:todoGroupId/todos', todosRouter);

module.exports = rootRouter;
