// backend/models/postModel.js
// Server-side sequelize model file defining the post schema and its associations

// Import required modules
const { Model, DataTypes } = require("sequelize");
const db = require("./index");

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
    sequelize: db.sequelize,
    modelName: "Post",
    tableName: "Posts",
  }
);

// Export Post model
module.exports = Post;