// backend/models/profileModel.js
// Server-side sequelize model file defining the profile schema

// Import required modules
const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("./index");
const User = require("./userModel");

// Define Profile model
class Profile extends Model {}

// Initialize Profile model with schema definition
Profile.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
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
  },
  {
    sequelize,
    modelName: "Profile",
    tableName: "Profiles",
  }
);

// Define the association with the User model
Post.belongsTo(User, { foreignKey: "userId" });

// Export Profile model
module.exports = Profile;