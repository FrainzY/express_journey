const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const taskAssignment = sequelize.define('taskAssignment', {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    task_id: {
        type: DataTypes.UUID,
        references: {
            model: 'tasks',
            key: 'id'
        }
    }, 
    assigned_to: {
        type: DataTypes.UUID,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    }, 
}, {
    tableName: 'task_assignment',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
})

module.exports = taskAssignment