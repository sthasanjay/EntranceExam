"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TestSeriesTemplateQuestion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
       this.belongsTo(models.TestSeriesTemplate, { foreignKey: "templateId" });
       this.hasOne(models.EntranceQuestion, { foreignKey: "questionId" });
       this.hasOne(models.Subject, { foreignKey: "subjectId" });
       this.hasOne(models.Chapter, { foreignKey: "chapterId" });
      // this.hasMany(models.EntranceQuestion, { foreignKey: "subjectId" });
    }
  }
  TestSeriesTemplateQuestion.init(
    {
      templateId: {
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
         primaryKey: true,
      },
      levelId: {
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
    },
    {
      sequelize,
      modelName: "TestSeriesTemplateQuestion",
    }
  );
  return TestSeriesTemplateQuestion;
};