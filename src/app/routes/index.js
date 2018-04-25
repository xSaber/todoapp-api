import initDefineResource from './defineResource';

export default (app, express, controllers) => {
  const defineResource = initDefineResource(app, express, controllers);

  defineResource({
    name      : 'todoGroup',
    namespaces: ['api', 'v1']
  });

  defineResource({
    name      : 'todo',
    parentName: 'todoGroup',
    actions   : ['index', 'create', 'update', 'destroy']
  });
};
