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
      User.belongsTo(models.Event, {foreignKey: 'EventId', targetKey: 'id'})
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
    nmr_wa: {
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
    EventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Please choose the event`
        },
        notNull: {
          msg: `Please choose the event`
        }
      }
    },
    barcode: DataTypes.STRING,
    poin: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};