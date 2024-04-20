// Server-side post model

"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      // Define associations here if needed
      Post.belongsTo(models.User, { foreignKey: "userId" }); 
    }
  }

  Post.init(
    {
      title: DataTypes.STRING, // Title of the post
      content: DataTypes.TEXT, // Text content of the post
      multimediaUrl: DataTypes.STRING, // URL for multimedia content (optional)
      userId: DataTypes.INTEGER, // Foreign key referencing the user who created the post
    },
    {
      sequelize,
      modelName: "Post",
    }
  );

  return Post;
};
