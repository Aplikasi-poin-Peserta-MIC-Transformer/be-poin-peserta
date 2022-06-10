'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.addColumn('Teams', 'EventId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Events',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
      })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.removeColumn('Teams', 'EventId')
  }
};
