// backend/models/postModel.js
// Server-side sequelize model file defining the post schema and its associations

// Import required modules
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// Define Post model
class Post extends Model {
  // Define method to associate Post with User model
  static associate(models) {
    Post.belongsTo(models.User, { foreignKey: "userId" }); 
  }
}

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

module.exports = Post;