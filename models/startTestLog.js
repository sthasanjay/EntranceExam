"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class StartTestLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  StartTestLog.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      scopeCategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      totalQuestionCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      attemptedCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      correctCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      wrongCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      isSubmitted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "StartTestLog",
    }
  );
  return StartTestLog;
};
