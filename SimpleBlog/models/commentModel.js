const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Comment = sequelize.define('Comment', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    post_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
            model: 'posts',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
        model: 'users',
        id: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
}, {
    tableName: 'comments',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Comment;