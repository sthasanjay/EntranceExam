"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class StartTestQuestion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Subject, { foreignKey: "subjectId" });
      this.belongsTo(models.Chapter, { foreignKey: "chapterId" });
    }
  }
  StartTestQuestion.init(
    {
      startTestLogId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      scopeCategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      questionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      chapterId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      subjectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      levelId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      selectedAnswer: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      hasAttempted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isCorrect: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      isReported: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      questionReportId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      reportedText: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "StartTestQuestion",
    }
  );
  return StartTestQuestion;
};
