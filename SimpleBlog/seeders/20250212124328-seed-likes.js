const { v4: uuidv4 } = require('uuid');

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const users = await queryInterface.sequelize.query(
      'SELECT * FROM "users";',
      { type: Sequelize.QueryTypes.SELECT }
    );

    const posts = await queryInterface.sequelize.query(
      'SELECT * FROM "posts";',
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
   await queryInterface.bulkInsert('likes', [
    {
      "id": uuidv4(),
      "post_id": posts[0].id,
      "user_id": users[1].id,
      "created_at": new Date()
    },
    {
      "id": uuidv4(),
      "post_id": posts[1].id,
      "user_id": users[2].id,
      "created_at": new Date()
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
    await queryInterface.bulkDelete('likes', null, {});
  }
};
