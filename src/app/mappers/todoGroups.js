const renderOne = todoGroup => ({
	id   : todoGroup.id,
	title: todoGroup.title
});

export const mapOne = data => ({
	todoGroup: renderOne(data.todoGroup)
});

export const mapMany = data => ({
	todoGroups: data.todoGroups.map(todoGroup => renderOne(todoGroup))
});
