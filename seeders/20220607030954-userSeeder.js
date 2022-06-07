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
     await queryInterface.bulkInsert('Users', [{
      nama: 'Tester 01',
      password: Crypto.encrypt('tester123', process.env.SECRET_KEY),
      nmr_wa: '08123456789',
      perusahaan: 'PT Testing',
      EventId: 1,
      barcode: '',
      poin: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nama: 'Tester 02',
      password: Crypto.encrypt('tester1234', process.env.SECRET_KEY),
      nmr_wa: '081234567890',
      perusahaan: 'PT Testing',
      EventId: 1,
      barcode: '',
      poin: 0,
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
     await queryInterface.bulkDelete('Users', null, {});
  }
};
