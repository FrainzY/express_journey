const {Sequelize} = require('sequelize');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

const sequelize = new Sequelize(process.env.PGDATABASE, process.env.PGUSER, process.env.PGPASSWORD, {
    host: process.env.PGHOST,
    dialect: "postgresql",
    logging: false
});

module.exports = sequelize;