"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class QuestionReport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  QuestionReport.init(
    {
      reportTitle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      reportDescription: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        default: true,
      },
    },
    {
      sequelize,
      modelName: "QuestionReport",
    }
  );
  return QuestionReport;
};
