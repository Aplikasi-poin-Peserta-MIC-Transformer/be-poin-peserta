'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Team_member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Team_member.belongsTo(models.Team, {foreignKey: 'TeamId', targetKey: 'id'})
    }
  }
  Team_member.init({
    nama_member: DataTypes.STRING,
    no_wa: DataTypes.STRING,
    TeamId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Team_member',
  });
  return Team_member;
};