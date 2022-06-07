'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Gift extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Gift.belongsTo(models.Event, {foreignKey: 'EventId', targetKey: 'id'})
    }
  };
  Gift.init({
    nama: {
      type: DataTypes.STRING,
      allowNull:false,
      unique: true,
      validate: {
        notEmpty: {
          msg: `Gift Name is Required`
        },
        notNull: {
          msg: `Gift Name is Required`
        }
      }
    },
    image: DataTypes.STRING,
    stok: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          msg: `Stock Must Be a Number`
        },
        min: {
          args: [0],
          msg: `Minimum Stock is 0`
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          msg: `Price Must Be a Number`
        },
        min: {
          args: [0],
          msg: `Minimum Price is 0`
        }
      }
    },
    EventId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Gift',
  });

  Gift.beforeCreate((gift, opt) => {
    if (!gift.image) {
      gift.image = `https://source.unsplash.com/random`
    }
  })
  
  return Gift;
};