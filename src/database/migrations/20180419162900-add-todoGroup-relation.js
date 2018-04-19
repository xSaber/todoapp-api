'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Todos',
      'todoGroupId',
      Sequelize.INTEGER
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Todos', 'todoGroupId');
  }
};
