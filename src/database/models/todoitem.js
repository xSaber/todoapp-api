import { Model, DataTypes } from 'sequelize';

module.exports = class TodoItem extends Model {
    static init (sequelize) {
        return super.init({
            content : {
                type      : DataTypes.STRING,
                allowNull : false,
            },
            complete:  {
                type         : DataTypes.BOOLEAN,
                defaultValue : false,
            }
        }, {
            sequelize
        });
    }

    static associate (models) {
        this.belongsTo(models.Todo, {
            foreignKey: 'todoId',
            onDelete: 'CASCADE',
        });
    }
}
