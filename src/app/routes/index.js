import * as controllers from '../controllers'
import mappers from '../mappers'
import createDefineResource from './defineResource'

export default (app, express) => {
  const routers = {
    todoGroups: express.Router(),
    todos: express.Router({ mergeParams: true })
  }

  const defineResource = createDefineResource({ app, routers, controllers, mappers })

  defineResource({
    name: 'todoGroup'
  })

  defineResource({
    name: 'todo',
    actions: ['index', 'create', 'update', 'destroy'],
    parent: 'todoGroup'
  })
}
