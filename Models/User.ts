const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql');

const User = sequelize.define(
    'User',
    {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }
);