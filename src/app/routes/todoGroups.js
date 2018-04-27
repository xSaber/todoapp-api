import { Router } from 'express';
import { todoGroupsController } from '~/app/controllers';

export default Router()
  .post('/', todoGroupsController.create)
  .get('/', todoGroupsController.index)
  .get('/:todoGroupId', todoGroupsController.show)
  .patch('/:todoGroupId', todoGroupsController.update)
  .put('/:todoGroupId', todoGroupsController.update)
  .delete('/:todoGroupId', todoGroupsController.destroy);
