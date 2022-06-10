'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Point, {foreignKey: 'TeamId_or_UserId', sourceKey: 'id'})
      User.hasMany(models.Pos_step, {foreignKey: 'TeamId_or_UserId', sourceKey: 'id'})
      User.hasMany(models.Log_point, {foreignKey: 'UserId', sourceKey: 'id'})
      User.belongsTo(models.Team, {foreignKey: 'TeamId', targetKey: 'id'})
      User.belongsTo(models.Event, {foreignKey: 'EventId', targetKey: 'id'})
      User.belongsToMany(models.Gift, {through: models.User_Gift, foreignKey: 'UserId', otherKey: 'GiftId'})
    }
  }
  User.init({
    nama: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty: {
          msg: `Name is Required`
        },
        notNull: {
          msg: `Name is Required`
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
    no_wa: {
      type: DataTypes.STRING,
      allowNull:false,
      unique: true,
      validate: {
        notEmpty: {
          msg: `Whatsapp Number is Required`
        },
        notNull: {
          msg: `Whatsapp Number is Required`
        }
      }
    },
    barcode: DataTypes.STRING,
    perusahaan: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty: {
          msg: `Company Name is Required`
        },
        notNull: {
          msg: `Company Name is Required`
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'user'
    },
    TeamId: DataTypes.INTEGER,
    EventId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};