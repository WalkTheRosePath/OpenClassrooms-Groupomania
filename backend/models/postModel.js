// backend/models/postModel.js
// Server-side sequelize model file defining the post schema and its associations

// Import required modules
const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("./index");
const User = require("./userModel");

// Define Post model
class Post extends Model {}

// Initialize Post model
Post.init(
  {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    multimediaUrl: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: "Post",
    tableName: "Posts",
  }
);

// Define the association with the User model
Post.belongsTo(User, { foreignKey: "userId" });

// Export Post model
module.exports = Post;
