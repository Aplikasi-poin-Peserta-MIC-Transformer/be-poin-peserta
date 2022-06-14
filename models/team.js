'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Team.hasMany(models.Team_member, {foreignKey: 'TeamId', sourceKey: 'id'})
      Team.hasMany(models.Point, {foreignKey: 'TeamId_or_UserId', sourceKey: 'id'})
      Team.hasMany(models.Pos_step, {foreignKey: 'TeamId_or_UserId', sourceKey: 'id'})
      Team.belongsTo(models.Event, {foreignKey: 'EventId', targetKey: 'id'})
    }
  }
  Team.init({
    nama_tim: {
      type: DataTypes.STRING,
      allowNull:false,
      unique: true,
      validate: {
        notEmpty: {
          msg: `Team Name is Required`
        },
        notNull: {
          msg: `Team Name is Required`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Password is Required`
        },
        len: {
          args: [6,100],
          msg: `Password Should Have Minimum 6 Characters`
        }
      }
    },
    barcode: DataTypes.STRING,
    EventId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Team',
  });
  return Team;
};