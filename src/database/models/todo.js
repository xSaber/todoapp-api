import { Model, DataTypes } from 'sequelize';

module.exports = class Todo extends Model {
    static init(sequelize) {
        return super.init({
            title : {
                type      : DataTypes.STRING,
                allowNull : false,
            }
        }, {
            sequelize
        });
    }

    static associate(models) {
        this.hasMany(models.TodoItem, {
            foreignKey : 'todoId',
            as         : 'todoItems',
        });
    }
}
