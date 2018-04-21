import { plural } from 'pluralize'
import * as controllers from '../controllers'
import mappers from '../mappers'

const REST_ACTIONS = {
  INDEX:   'index',
  SHOW:    'show',
  CREATE:  'create',
  UPDATE:  'update',
  DESTROY: 'destroy'
}

const HTTP = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  PATCH: 'patch',
  DELETE: 'delete'
}

const createActionMap = resourceName => ({
  [REST_ACTIONS.INDEX]: {
    route: '/',
    multiple: true,
    methods: [HTTP.GET]
  },
  [REST_ACTIONS.SHOW]: {
    route: `/:${resourceName}Id`,
    multiple: false,
    methods: [HTTP.GET]
  },
  [REST_ACTIONS.CREATE]: {
    route: '/',
    multiple: false,
    methods: [HTTP.POST]
  },
  [REST_ACTIONS.UPDATE]: {
    route: `/:${resourceName}Id`,
    multiple: false,
    methods: [HTTP.PUT, HTTP.PATCH]
  },
  [REST_ACTIONS.DESTROY]: {
    route: `/:${resourceName}Id`,
    multiple: null,
    methods: [HTTP.DELETE]
  }
})

export default (appScope) => {
  const routers = {}
  const { app, express } = appScope

  return (options) => {
    const { name, parentName } = options
    let { actions } = options

    // TODO: throw exception if name is not present or blank
    // TODO: handle app, routers, controller, mappers invalid arguments
    actions = actions && actions.length ? actions : Object.values(REST_ACTIONS)

    const namePlural = plural(name)
    const parentNamePlural = parentName && plural(parentName)

    const parentRouter = parentNamePlural && routers[parentNamePlural]
    const routerOptions = parentRouter ? { mergeParams: true } : {}
    const router = express.Router(routerOptions)
    const mapper = mappers[namePlural]
    const controller = controllers[`${namePlural}Controller`]

    const actionMap = createActionMap(name)

    routers[namePlural] = router

    if (parentRouter) {
      parentRouter.use(`/:${parentName}Id/${namePlural}`, router)
    } else {
      app.use(`/${namePlural}`, router)
    }

    actions.forEach(action => {
      const handler = controller[action]
      const actionConfig = actionMap[action]
      const { route, multiple, methods } = actionConfig

      methods.forEach(method => {
        if (multiple === null) {
          router[method](route, handler)
          return
        }

        router[method](route, handler, (req, res) => {
          const functionName = multiple ? 'mapMany' : 'mapOne'
          const response = mapper[functionName](res.locals.data)
          res.status(200).send(response)
        })
      })
    })
  }
}
