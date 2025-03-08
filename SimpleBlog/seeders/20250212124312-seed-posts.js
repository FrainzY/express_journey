const { v4: uuidv4 } = require('uuid');

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const users = await queryInterface.sequelize.query(
      'SELECT * FROM "users";',
      { type: Sequelize.QueryTypes.SELECT }
    );

    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('posts', [
      {
        "id": uuidv4(),
        "title": "First Blog Post",
        "content": "This is the content of the first blog post.",
        "user_id": users[0].id,
        "created_at": new Date(),
        "updated_at": new Date()
      },
      {
        "id": uuidv4(),
        "title": "Second Blog Post",
        "content": "Content of the second blog post.",
        "user_id": users[1].id,
        "created_at": new Date(),
        "updated_at": new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('posts', null, {});
  }
};
