const renderOne = todo => ({
  id       : todo.id,
  title    : todo.content,
  completed: todo.completed
});

export default {
  mapOne: todo => ({
    todo: renderOne(todo)
  }),

  mapMany: todos => ({
    todos: todos.map(todo => renderOne(todo))
  })
};
