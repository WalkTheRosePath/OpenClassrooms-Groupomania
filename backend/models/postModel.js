// backend/models/postModel.js
// Server-side sequelize model file defining the post schema and its associations

// Import required modules
const { Model } = require("sequelize");

// Define Post model
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {}

  // Initialize Post model
  Post.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      multimediaUrl: DataTypes.STRING,
      usersRead: DataTypes.ARRAY(DataTypes.INTEGER),
    },
    {
      sequelize,
      modelName: "Post",
      tableName: "Posts",
    }
  );
  // Define the association with the User model
  Post.associate = (models) => {
    Post.belongsTo(models.User, { foreignKey: "userId" });
  };
  return Post;
};