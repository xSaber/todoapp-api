const renderOne = todoGroup => ({
  id   : todoGroup.id,
  title: todoGroup.title
});

export const mapOne = todoGroup => ({
  todoGroup: renderOne(todoGroup)
});

export const mapMany = todoGroups => ({
  todoGroups: todoGroups.map(todoGroup => renderOne(todoGroup))
});
