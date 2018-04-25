import * as controllers from '../controllers';
import initDefineResource from './defineResource';

export default (app, express) => {
  const defineResource = initDefineResource(app, express, controllers);

  defineResource({
    name      : 'todoGroup',
    namespaces: ['api', 'v1'],
    urlCase   : 'camel'
  });

  defineResource({
    name      : 'todo',
    parentName: 'todoGroup',
    actions   : ['index', 'create', 'update', 'destroy'],
    urlCase   : 'camel'
  });
};
