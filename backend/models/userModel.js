// backend/models/userModel.js
// Server-side sequelize model file defining the user schema

// Import required modules
const { Model, DataTypes } = require("sequelize");
const db = require("./index");

// Define User model
class User extends Model {}

// Initialize User model with schema definition
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
    sequelize: db.sequelize,
    modelName: "User",
    tableName: "Users",
  }
);

// Export User model
module.exports = User;