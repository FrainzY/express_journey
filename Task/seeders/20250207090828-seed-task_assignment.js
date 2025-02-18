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
    const users = await queryInterface.sequelize.query(
      'SELECT * FROM "users";',
      { type: Sequelize.QueryTypes.SELECT }
    );

    const tasks = await queryInterface.sequelize.query(
      'SELECT * FROM "tasks";',
      { type: Sequelize.QueryTypes.SELECT }
    );

    await queryInterface.bulkInsert('task_assignment', [
      {
        id: uuidv4(),
        task_id: tasks[0].id, // replace with valid task_id from tasks table
        assigned_to: users[0].id, // replace with valid user_id from users table
        created_at: new Date(),
      },
      {
        id: uuidv4(),
        task_id: tasks[1].id,
        assigned_to: users[1].id,
        created_at: new Date(),
      },
      {
        id: uuidv4(),
        task_id: tasks[2].id,
        assigned_to: users[2].id,
        created_at: new Date(),
      },
      {
        id: uuidv4(),
        task_id: tasks[3].id,
        assigned_to: users[3].id,
        created_at: new Date(),
      },
      {
        id: uuidv4(),
        task_id: tasks[4].id,
        assigned_to: users[4].id,
        created_at: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('task_assignment', null, {});
  }
};
