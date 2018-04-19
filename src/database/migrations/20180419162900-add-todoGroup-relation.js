'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Todos',
      'todoGroupId',
      {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'TodoGroups',
          key: 'id',
          as: 'todoGroupId',
        },
      }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Todos', 'todoGroupId');
  }
};
