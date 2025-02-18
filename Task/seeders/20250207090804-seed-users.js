const { v4: uuidv4 } = require('uuid');

'use strict';

/** @type {import('sequelize-cli').Migration} */
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
    await queryInterface.bulkInsert('users', [
      {
        id: uuidv4(),
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        password: 'password123',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Alice Johnson',
        email: 'alice.johnson@example.com',
        password: 'password123',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Bob Brown',
        email: 'bob.brown@example.com',
        password: 'password123',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Charlie White',
        email: 'charlie.white@example.com',
        password: 'password123',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: 'David Green',
        email: 'david.green@example.com',
        password: 'password123',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Eva Black',
        email: 'eva.black@example.com',
        password: 'password123',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Frank Gray',
        email: 'frank.gray@example.com',
        password: 'password123',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Grace Blue',
        email: 'grace.blue@example.com',
        password: 'password123',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Henry Red',
        email: 'henry.red@example.com',
        password: 'password123',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {});
  }
};
