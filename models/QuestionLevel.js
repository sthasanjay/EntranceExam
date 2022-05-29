"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class QuestionLevel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.EntranceQuestion, { foreignKey: "levelId" });
    }
  }
  QuestionLevel.init(
    {
      levelId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      levelName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isActive: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "QuestionLevel",
    }
  );
  return QuestionLevel;
};
