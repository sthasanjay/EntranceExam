"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserTestSeriesLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.hasMany(models.EntranceQuestion, { foreignKey: "subjectId" });
      this.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  UserTestSeriesLog.init(
    {
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
      templateType: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      duration: {
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
      reportCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      attemptedCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "UserTestSeriesLog",
    }
  );
  return UserTestSeriesLog;
};
