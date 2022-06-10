'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Log_point extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Log_point.belongsTo(models.User, {foreignKey: 'UserId', targetKey: 'id'})
      Log_point.belongsTo(models.Gift, {foreignKey: 'GiftId', targetKey: 'id'})
    }
  }
  Log_point.init({
    UserId: DataTypes.INTEGER,
    GiftId: DataTypes.INTEGER,
    poin: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Log_point',
  });
  return Log_point;
};