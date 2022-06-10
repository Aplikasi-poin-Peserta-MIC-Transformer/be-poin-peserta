'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.addColumn('Users', 'TeamId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Teams',
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
     await queryInterface.removeColumn('Users', 'TeamId')
  }
};