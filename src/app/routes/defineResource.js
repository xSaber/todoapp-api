import { plural } from 'pluralize'

const REST_ACTIONS = {
  INDEX:   'index',
  SHOW:    'show',
  CREATE:  'create',
  UPDATE:  'update',
  DESTROY: 'destroy'
}

export default appScope => options => {
  const { app, routers, controllers, mappers } = appScope

  const { name, parentName } = options
  let { actions } = options

  // TODO: throw exception if name is not present or blank
  // TODO: handle app, routers, controller, mappers invalid arguments
  actions = actions && actions.length ? actions : Object.values(REST_ACTIONS)

  const namePlural = plural(name)
  const parentNamePlural = parentName && plural(parentName)

  const router = routers[namePlural]
  const parentRouter = parentNamePlural && routers[parentNamePlural]
  const mapper = mappers[namePlural]
  const controller = controllers[`${namePlural}Controller`]

  const actionMap = {
    'index':   { route: '/',           multiple: true,  methods: ['get']          },
    'show':    { route: `/:${name}Id`, multiple: false, methods: ['get']          },
    'create':  { route: '/',           multiple: false, methods: ['post']         },
    'update':  { route: `/:${name}Id`, multiple: false, methods: ['put', 'patch'] },
    'destroy': { route: `/:${name}Id`, multiple: null,  methods: ['delete']       }
  }

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
