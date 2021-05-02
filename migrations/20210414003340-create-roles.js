'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('roles', {
      role_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      role_name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('roles');
  }
};