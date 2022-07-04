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
      Gift.hasMany(models.Log_point, {foreignKey: 'GiftId', sourceKey: 'id'})
      Gift.belongsToMany(models.User, {through: models.User_Gift, foreignKey: 'GiftId', otherKey: 'UserId'})
    }
  }
  Gift.init({
    nama: DataTypes.STRING,
    gambar: DataTypes.TEXT,
    harga: DataTypes.INTEGER,
    stok: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Gift',
  });
  return Gift;
};