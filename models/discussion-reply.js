"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DiscussionReply extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Discussion, { foreignKey: "discussionId" });
      this.hasMany(models.DiscussionReply, { foreignKey: "parentDiscussionReplyId" });
    }
  }
  DiscussionReply.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      discussionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      replyMessage: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      replyImage: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      scopeCategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      discussCategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      isReported: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      parentDiscussionReplyId:{
        type: DataTypes.INTEGER,
        allowNull: true,
      }
    },
    {
      sequelize,
      modelName: "DiscussionReply",
    }
  );
  return DiscussionReply;
};
