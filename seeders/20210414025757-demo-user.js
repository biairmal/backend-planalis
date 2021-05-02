'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     return queryInterface.bulkInsert('users', [{
      email : 'test1@gmail.com',
      name : 'Testing 1',
      password : 'testing1234',
      role_id : 1
    }, {
      email : 'test2@gmail.com',
      name : 'Testing 2',
      password : 'testing1234',
      role_id : 1
    }])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
