"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Chapter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Subject, { foreignKey: "subjectId" });
      this.hasMany(models.EntranceQuestion, { foreignKey: "chapterId" });
      this.hasMany(models.Chapter, { foreignKey: "parentId" });
      this.hasMany(models.StartTestQuestion, { foreignKey: "chapterId" });
      this.belongsTo(models.TestSeriesTemplateQuestion, { foreignKey: "chapterId" });
    }
  }
  Chapter.init(
    {
      chapterId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      chapterName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      subjectId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      parentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Chapter",
    }
  );
  return Chapter;
};
