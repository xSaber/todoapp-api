const renderOne = todo => ({
  id      : todo.id,
  title   : todo.content,
  complete: todo.complete
});

export const mapOne = todo => ({
  todo: renderOne(todo)
});

export const mapMany = todos => ({
  todos: todos.map(todo => renderOne(todo))
});
