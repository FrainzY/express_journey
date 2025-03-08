const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../config/database')

const Like = sequelize.define('Like', {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    post_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
        model: 'posts',
        key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
        model: 'users',
        key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
}, {
    tableName: 'likes',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
})

module.exports = Like;