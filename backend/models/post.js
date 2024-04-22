// Server-side post model

"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
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
    }
  );

  return Post;
};
