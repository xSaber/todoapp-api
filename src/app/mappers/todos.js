const renderOne = todo => ({
  id:    todo.id,
  title: todo.content
})

export const mapOne = todo => ({
  todo: renderOne(todo)
})

export const mapMany = data => {
  return {
    todos: data.todos.map(todo => renderOne(todo))
  }
}
