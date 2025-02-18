const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    
}, {
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    hooks: {
        // hash password sebelum user dibuat
        beforeCreate: async(user) => {
            if(user.password){
                const hashPass = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, hashPass);
            }
        },
        // hash password saat update password
        beforeUpdate: async (user) => {
            if(user.changed('password')){
                const hashPass = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, hashPass);
            }
        }
    },
    defaultScope: {
        attributes: { exclude: ['password'] }
    },
    scopes: { 
        withPassword: { 
            attributes: { 
                include: ['password'] 
            } 
        } 
    }
});

User.prototype.correctPassword = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = User;