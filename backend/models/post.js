// backend/models/post.js
// Server-side sequelize model file defining the post schema and its associations

const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class Post extends Model {
  static associate(models) {
    Post.belongsTo(models.User, { foreignKey: "userId" }); 
  }
}

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