'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Point extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Point.belongsTo(models.Event, {foreignKey: 'EventId', targetKey: 'id'})
    }
  }
  Point.init({
    TeamId_or_UserId: DataTypes.STRING,
    total_poin: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Point',
  });
  return Point;
};