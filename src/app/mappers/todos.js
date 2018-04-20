const renderOne = todo => ({
	id      : todo.id,
	title   : todo.content,
	complete: todo.complete
});

export const mapOne = data => ({
	todo: renderOne(data.todo)
});

export const mapMany = data => ({
	todos: data.todos.map(todo => renderOne(todo))
});
