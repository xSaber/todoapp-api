const renderOne = todo => ({
  id      : todo.id,
  title   : todo.content,
  complete: todo.complete
});

module.exports = {
  mapOne: todo => ({
    todo: renderOne(todo)
  }),

  mapMany: todos => ({
    todos: todos.map(todo => renderOne(todo))
  })
};
