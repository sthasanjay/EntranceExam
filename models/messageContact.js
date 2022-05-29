"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MessageContact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: "messageWithId" });
    }
  }
  MessageContact.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      scopeCategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      messageWithId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      messageRoom: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastMessage: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lastMessageIsImage: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      hasOpened: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      unOpenedCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      isDisabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "MessageContact",
    }
  );
  return MessageContact;
};
