const {v4: uuidv4} = require('uuid');
const bcrypt = require('bcryptjs');

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
    const users = [
      {
        "name": "John Doe",
        "email": "johndoe@example.com",
        "password": "hashedpassword1",
      },
      {
        "name": "Jane Smith",
        "email": "janesmith@example.com",
        "password": "hashedpassword2",
      },
      {
        "name": "Alice Johnson",
        "email": "alicej@example.com",
        "password": "hashedpassword3",
      },
      {
        "name": "Bob Brown",
        "email": "bobbrown@example.com",
        "password": "hashedpassword4",
      },
      {
        "name": "Charlie White",
        "email": "charliew@example.com",
        "password": "hashedpassword5",
      }
    ]

    const hashedUsers = await Promise.all(users.map(async (user) => ({
      "id": uuidv4(),
      "name": user.name,
      "email": user.email,
      "password": await bcrypt.hash(user.password, 10),
      "created_at": new Date(),
      "updated_at": new Date()
    })));

    await queryInterface.bulkInsert('users', hashedUsers)
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
