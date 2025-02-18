const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Task = sequelize.define('Task', {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    status: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'Pending',
        validate: {
            isIn: ['Pending', 'InProgress', 'Completed']
        }
    },
    priority: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'Medium',
        validate: {
            isIn: ['Low', 'Medium', 'High']
        }
    },
    due_date:{
        type: DataTypes.DATE,
    },
}, {
    tableName: 'tasks',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
})

module.exports = Task;