import { Router } from 'express';
import { todoGroupsController } from '~/app/controllers';
import wrapAsync from '~/app/routes/wrapAsync';

export default Router()
  .post('/', wrapAsync(todoGroupsController.create))
  .get('/', wrapAsync(todoGroupsController.index))
  .get('/:todoGroupId', wrapAsync(todoGroupsController.show))
  .patch('/:todoGroupId', wrapAsync(todoGroupsController.update))
  .put('/:todoGroupId', wrapAsync(todoGroupsController.update))
  .delete('/:todoGroupId', wrapAsync(todoGroupsController.destroy));
