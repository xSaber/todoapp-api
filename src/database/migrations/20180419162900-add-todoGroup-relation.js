'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'Todos',
    'todoGroupId',
    {
      type      : Sequelize.INTEGER,
      onDelete  : 'CASCADE',
      references: {
        model: 'TodoGroups',
        key  : 'id',
        as   : 'todoGroupId'
      }
    }
  ),
  down: (queryInterface, Sequelize) => queryInterface.removeColumn('Todos', 'todoGroupId')
};
