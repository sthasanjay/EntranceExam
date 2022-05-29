"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserTestSeriesQuestion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.hasMany(models.EntranceQuestion, { foreignKey: "subjectId" });
      this.belongsTo(models.EntranceQuestion, { foreignKey: "questionId" });
    }
  }
  UserTestSeriesQuestion.init(
    {
      testSeriesLogId: {
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
      templateId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      questionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      subjectId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      chapterId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      selectedAnswer: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      isCorrect: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      hasAttemted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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
      modelName: "UserTestSeriesQuestion",
    }
  );
  return UserTestSeriesQuestion;
};
