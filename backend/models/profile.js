// Server-side profile model (profile.js)

const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class Profile extends Model {}

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

module.exports = Profile;
