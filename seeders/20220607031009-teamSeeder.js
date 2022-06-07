'use strict';
if (process.env.NODE_ENV != 'production') {
  require('dotenv').config()
};
const Crypto = require('../helpers/cryptojs')

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('Teams', [{
      nama_team: 'Tester Team 01',
      password: Crypto.encrypt('tester123', process.env.SECRET_KEY),
      barcode: '',
      point: 0,
      pos_step: 0,
      EventId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nama_team: 'Tester Team 02',
      password: Crypto.encrypt('tester1234', process.env.SECRET_KEY),
      barcode: '',
      point: 0,
      pos_step: 0,
      EventId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Teams', null, {});
  }
};
