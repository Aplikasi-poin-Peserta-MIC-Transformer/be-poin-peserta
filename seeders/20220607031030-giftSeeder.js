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
     await queryInterface.bulkInsert('Gifts', [{
      nama: 'Test Gift 01',
      image: 'https://source.unsplash.com/random',
      stok: 5,
      price: 10000,
      EventId: 1,
      UserId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nama: 'Test Gift 02',
      image: 'https://source.unsplash.com/random',
      stok: 7,
      price: 15000,
      EventId: 1,
      UserId: 1,
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
     await queryInterface.bulkDelete('Gifts', null, {});
  }
};
