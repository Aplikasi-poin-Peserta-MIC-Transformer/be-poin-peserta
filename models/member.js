'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Member.belongsTo(models.Team, {foreignKey: 'TeamId', targetKey: 'id'})
    }
  }
  Member.init({
    nama: {
      type: DataTypes.STRING,
      allowNull:false,
      unique: true,
      validate: {
        notEmpty: {
          msg: `Member Name is Required`
        },
        notNull: {
          msg: `Member Name is Required`
        }
      }
    },
    no_wa: {
      type: DataTypes.INTEGER,
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
    TeamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `You are unauthenticated`
        },
        notNull: {
          msg: `You are unauthenticated`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Member',
  });
  return Member;
};