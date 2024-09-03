const { DataTypes } = require("sequelize")
const { connection } = require("../database/connection")
const Permission = require("./Permission")
const Role = require("./Role")

const PermissionRole = connection.define("permissionRole", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  roleId: {
    type: DataTypes.INTEGER,
    references: {
      model: Role,
      key: "id"
    }
  },
  permissionId: {
    type: DataTypes.INTEGER,
    references: {
      model: Permission,
      key: "id"
    }    
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Date.now()
  },
  updatedAt: {
    type: DataTypes.DATE,
  }
})

module.exports = PermissionRole