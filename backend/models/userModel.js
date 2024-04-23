// backend/models/userModel.js
// Server-side sequelize model file defining the user schema

const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class User extends Model {}

User.init(
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize, 
    modelName: "User", 
    tableName: "Users", 
  }
);

module.exports = User;
