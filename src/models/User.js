const { DataTypes } = require('sequelize');
const { connection }  = require('../database/connection');

const User = connection.define('user', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome:{
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING,
    unique: true
  },
  password: {
    type: DataTypes.STRING
  },
  createdAt: {
   type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE
  },
})

module.exports = User;