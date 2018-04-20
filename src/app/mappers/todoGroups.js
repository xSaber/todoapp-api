const renderOne = todoGroup => ({
  id:    todoGroup.id,
  title: todoGroup.title
})

export const mapOne = todoGroup => ({
  todoGroup: renderOne(todoGroup)
})

export const mapMany = data => ({
  todoGroups: data.todoGroups.map(todoGroup => renderOne(todoGroup))
})
