const sequelize = require('sequelize');
const { Model, DataTypes } = sequelize;

module.exports = class Todo extends Model {
  static init (sequelize) {
    return super.init({
      content: {
        type     : DataTypes.STRING,
        allowNull: false
      },
      complete: {
        type        : DataTypes.BOOLEAN,
        defaultValue: false
      }
    }, {
      sequelize
    });
  }

  static associate (models) {
    this.belongsTo(models.TodoGroup, {
      foreignKey: {
        allowNull: false,
        name     : 'todoGroupId'
      },
      onDelete: 'CASCADE'
    });
  }
};
