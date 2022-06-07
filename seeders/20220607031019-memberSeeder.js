'use strict';

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
     await queryInterface.bulkInsert('Members', [{
      nama: 'Tester 01',
      no_wa: '081123456789',
      TeamId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nama: 'Tester 02',
      no_wa: '0811234567890',
      TeamId: 1,
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
     await queryInterface.bulkDelete('Members', null, {});
  }
};
