import { Router } from 'express';
import { todoGroupsController } from '~/app/controllers';

const todoGroupsRouter = Router();

todoGroupsRouter.post('/', todoGroupsController.create);
todoGroupsRouter.get('/', todoGroupsController.index);
todoGroupsRouter.get('/:todoGroupId', todoGroupsController.show);
todoGroupsRouter.patch('/:todoGroupId', todoGroupsController.update);
todoGroupsRouter.put('/:todoGroupId', todoGroupsController.update);
todoGroupsRouter.delete('/:todoGroupId', todoGroupsController.destroy);

export default todoGroupsRouter;
