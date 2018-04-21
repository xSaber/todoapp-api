import * as controllers from '../controllers'
import mappers from '../mappers'
import defineResource from './defineResource'

export default (app, express) => {
  const routers = {
    todoGroups: express.Router(),
    todos: express.Router({ mergeParams: true })
  }

  const defineResourceArgs = { app, routers, controllers, mappers }

  defineResource({
    ...defineResourceArgs,
    name: 'todoGroups'
  })

  defineResource({
    ...defineResourceArgs,
    name: 'todos',
    actions: ['index', 'create', 'update', 'destroy'],
    parent: 'todoGroups'
  })

  // DEBUG
  Object.values(routers).forEach(router => {
    router.stack.forEach(layer => {
      const { path } = layer.route
      console.log(path)
    })
  })
}
