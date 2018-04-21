import createDefineResource from './defineResource'

export default (app, express) => {
  const defineResource = createDefineResource(app, express)

  defineResource({
    name: 'todoGroup',
    namespaces: ['api', 'v1']
  })

  defineResource({
    name: 'todo',
    parentName: 'todoGroup',
    actions: ['index', 'create', 'update', 'destroy']
  })
}
