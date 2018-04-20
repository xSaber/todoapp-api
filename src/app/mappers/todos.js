const renderOne = todo => ({
  id:    todo.id,
  title: todo.content
})

export const mapOne = data => ({
  todo: renderOne(data.todo)
})

export const mapMany = data => {
  return {
    todos: data.todos.map(todo => renderOne(todo))
  }
}
