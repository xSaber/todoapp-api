import { Model, DataTypes } from 'sequelize';

module.exports = class TodoGroup extends Model {
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
        this.hasMany(models.Todo);
    }
}
