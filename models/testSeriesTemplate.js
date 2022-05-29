"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TestSeriesTemplate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.TestSeriesTemplateQuestion, {
        foreignKey: "templateId",
      });
      // this.hasMany(models.Chapter, { foreignKey: "subjectId" });
    }
  }
  TestSeriesTemplate.init(
    {
      seriesName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      activationDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      questionCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      templateType: {
        type: DataTypes.ENUM,
        values: ["mock", "daily", "free"],
        defaultValue: "mock",
        allowNull: true,
      },
      scopeCategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      isFree: {
        type: DataTypes.INTEGER,
        defaultValue: false,
      },
      isUpcomingTest: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "TestSeriesTemplate",
    }
  );
  return TestSeriesTemplate;
};
