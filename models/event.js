'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Event.hasMany(models.Team, {foreignKey: 'EventId', sourceKey: 'id'})
      Event.hasMany(models.User, {foreignKey: 'EventId', sourceKey: 'id'})
    }
  }
  Event.init({
    nama_event: {
      type: DataTypes.STRING,
      allowNull:false,
      unique: true,
      validate: {
        notEmpty: {
          msg: `Event Name is Required`
        },
        notNull: {
          msg: `Event Name is Required`
        }
      }
    },
    gambar: DataTypes.TEXT,
    jml_pos: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};