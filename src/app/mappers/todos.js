const renderOne = todo => ({
  id      : todo.id,
  title   : todo.content,
  complete: todo.complete
});

export default {
  mapOne: todo => ({
    todo: renderOne(todo)
  }),

  mapMany: todos => ({
    todos: todos.map(todo => renderOne(todo))
  })
};
