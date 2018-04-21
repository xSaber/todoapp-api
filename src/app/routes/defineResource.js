const REST_ACTIONS = {
  INDEX:   'index',
  SHOW:    'show',
  CREATE:  'create',
  UPDATE:  'update',
  DESTROY: 'destroy'
}

export default options => {
  const { name, app, routers, controllers, mappers } = options
  let { actions, parentName } = options

  // TODO: throw exception if name is not present or blank
  actions = (actions && actions.length) ? actions : Object.values(REST_ACTIONS)

  const router = routers[name]
  const parentRouter = parentName && routers[parentName]
  const mapper = mappers[name]
  const controller = controllers[`${name}Controller`]
  const actionMap = {
    'index':   { route: '/',           multiple: true,  methods: ['get']          },
    'show':    { route: `/:${name}Id`, multiple: false, methods: ['get']          },
    'create':  { route: '/',           multiple: false, methods: ['post']         },
    'update':  { route: `/:${name}Id`, multiple: false, methods: ['put', 'patch'] },
    'destroy': { route: `/:${name}Id`, multiple: null,  methods: ['delete']       }
  }

  if (parentRouter) {
    parentRouter.use(`/:${parentName}Id/${name}`, router)
  } else {
    app.use(`/${name}`, router)
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
        const mapper = multiple ? mapper.mapMany : mapper.mapOne
      })
    })
  })
}
