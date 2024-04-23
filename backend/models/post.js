// Server-side post model (post.js)

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