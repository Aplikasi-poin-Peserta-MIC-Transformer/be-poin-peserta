'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.addColumn('Gifts', 'EventId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Events',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
      })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.removeColumn('Gifts', 'EventId')
  }
};
