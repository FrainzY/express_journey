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

    await queryInterface.bulkInsert('tasks', [
      {
        id: uuidv4(),
        user_id: users[0].id, // replace with valid user_id from the users table
        title: 'Fix Bugs',
        description: 'Fix the bugs reported in the last sprint',
        status: 'Pending',
        priority: 'High',
        due_date: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        user_id: users[1].id,
        title: 'Feature Implementation',
        description: 'Implement the new feature as requested by the product team',
        status: 'In Progress',
        priority: 'Medium',
        due_date: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        user_id: users[2].id,
        title: 'Code Review',
        description: 'Review code for the recent updates made by the team',
        status: 'Completed',
        priority: 'Low',
        due_date: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        user_id: users[3].id,
        title: 'Database Migration',
        description: 'Migrate the existing database to a new structure',
        status: 'Pending',
        priority: 'High',
        due_date: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        user_id: users[4].id,
        title: 'Documentation Update',
        description: 'Update the project documentation for the new API changes',
        status: 'In Progress',
        priority: 'Medium',
        due_date: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
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
    await queryInterface.bulkDelete('tasks', null, {});
  }
}
