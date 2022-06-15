'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pos_step extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Pos_step.belongsTo(models.Event, { foreignKey: 'EventId', targetKey: 'id' })
    }
  }
  Pos_step.init({
    TeamId_or_UserId: DataTypes.STRING,
    pos: DataTypes.INTEGER,
    status: DataTypes.STRING,
    EventId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Pos_step',
  });
  return Pos_step;
};