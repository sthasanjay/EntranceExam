"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class EntranceQuestion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.QuestionLevel, { foreignKey: "levelId" });
      this.belongsTo(models.Course, { foreignKey: "courseId" });
      this.belongsTo(models.Subject, { foreignKey: "subjectId" });
      this.belongsTo(models.Chapter, { foreignKey: "chapterId" });
      this.belongsTo(models.TestSeriesTemplateQuestion, { foreignKey: "questionId" });
      this.hasMany(models.UserTestSeriesQuestion, { foreignKey: "questionId" });
    }
  }
  EntranceQuestion.init(
    {
      questionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      levelId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      courseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      subjectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      chapterId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      question: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      option1: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      option2: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      option3: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      option4: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      correctAnswer: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      correctOption: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      addHint: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      uploadFile: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      createdDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      modifiedDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      remarks: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      isExamReserved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isApiUpload: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isOldData: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      isModelQuestion: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isFreeQuestion: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "EntranceQuestion",
    }
  );
  return EntranceQuestion;
};
