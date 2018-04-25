import { plural } from 'pluralize';
import { kebabCase } from 'lodash';

const REST_ACTIONS = {
  INDEX  : 'index',
  SHOW   : 'show',
  CREATE : 'create',
  UPDATE : 'update',
  DESTROY: 'destroy'
};

const HTTP = {
  GET   : 'get',
  POST  : 'post',
  PUT   : 'put',
  PATCH : 'patch',
  DELETE: 'delete'
};

const wrapAsync = (func) => (req, res, next) => (
  func(req, res, next).catch(error => next)
);

const createActionMap = resourceName => ({
  [REST_ACTIONS.INDEX]  : { route: '/', methods: [HTTP.GET] },
  [REST_ACTIONS.SHOW]   : { route: `/:${resourceName}Id`, methods: [HTTP.GET] },
  [REST_ACTIONS.CREATE] : { route: '/', methods: [HTTP.POST] },
  [REST_ACTIONS.UPDATE] : { route: `/:${resourceName}Id`, methods: [HTTP.PUT, HTTP.PATCH] },
  [REST_ACTIONS.DESTROY]: { route: `/:${resourceName}Id`, methods: [HTTP.DELETE] }
});

const parseOptions = (options) => {
  const { name, parentName } = options;
  let { namespaces, actions } = options;

  if (!name) {
    throw 'Resource name is not provided';
  }

  const restActions = Object.values(REST_ACTIONS);

  // Defaulting actions to *all* REST actions (see the REST_ACTIONS constants)
  actions = actions && actions.length ? actions : restActions;

  // Validating actions. Throwing error if a non-REST action has been provided
  actions.forEach(action => {
    if (!restActions.includes(action)) {
      throw `A non-REST action detected: '${action}'. Please use some set of ${restActions}.`;
    }
  });

  // If parent is provided, we won't apply namespaces, because these two
  // arguments are mutually exclusive
  if (parentName) {
    namespaces = [];
  }

  // Defaulting namespace to root (/) if not provided
  if (!namespaces) {
    namespaces = [];
  }

  // Assembling namespaces into a string. Empty string means the root namespace
  const namespace = namespaces.length ? `${namespaces.join('/')}/` : '';

  return { name, parentName, namespace, actions };
};

export default (app, express, controllers) => {
  const routers = {};

  return (options) => {
    const { name, parentName, namespace, actions } = parseOptions(options);

    // Creating different strings for the resource
    const namePlural = plural(name);
    const parentNamePlural = parentName && plural(parentName);
    const nameUrl = kebabCase(namePlural);

    // Finding and setting routers up
    const parentRouter = parentNamePlural && routers[parentNamePlural];
    const routerOptions = parentRouter ? { mergeParams: true } : {};
    const router = express.Router(routerOptions);
    routers[namePlural] = router;

    const controller = controllers[`${namePlural}Controller`];
    const actionMap = createActionMap(name);

    if (parentRouter) {
      parentRouter.use(`/:${parentName}Id/${nameUrl}`, router);
    } else {
      app.use(`/${namespace}${nameUrl}`, router);
    }

    actions.forEach(action => {
      const handler = controller[action];
      const actionConfig = actionMap[action];
      const { route, methods } = actionConfig;

      methods.forEach(method => {
        router[method](route, wrapAsync(handler));
      });
    });
  };
};
