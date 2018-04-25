const renderOne = todoGroup => ({
  id   : todoGroup.id,
  title: todoGroup.title
});

export default {
  mapOne: todoGroup => ({
    todoGroup: renderOne(todoGroup)
  }),

  mapMany: todoGroups => ({
    todoGroups: todoGroups.map(todoGroup => renderOne(todoGroup))
  })
};
