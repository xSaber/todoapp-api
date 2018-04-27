import { Router } from 'express';
import { todoGroupsController } from '~/app/controllers';
import * as middleware from '~/app/middleware';
import wrapAsync from '~/app/routes/wrapAsync';

export default Router()
    // this is basically pretty interesting, however, this route.param will get called from now on
    // /todo endpoints as well, not sure if it is required for shallow routes
  .param('todoGroupId', wrapAsync(middleware.getTodoGroup))
  .post('/', wrapAsync(todoGroupsController.create))
  .get('/', wrapAsync(todoGroupsController.index))
  .get('/:todoGroupId', wrapAsync(todoGroupsController.show))
  .patch('/:todoGroupId', wrapAsync(todoGroupsController.update))
  .put('/:todoGroupId', wrapAsync(todoGroupsController.update))
  .delete('/:todoGroupId', wrapAsync(todoGroupsController.destroy));
