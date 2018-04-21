import createDefineResource from './defineResource'

export default (app, express) => {
  const defineResource = createDefineResource({ app, express })

  defineResource({
    name: 'todoGroup'
  })

  defineResource({
    name: 'todo',
    actions: ['index', 'create', 'update', 'destroy'],
    parentName: 'todoGroup'
  })
}
