"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Subject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.EntranceQuestion, { foreignKey: "subjectId" });
      this.hasMany(models.Chapter, { foreignKey: "subjectId" });
      this.hasMany(models.StartTestQuestion, { foreignKey: "subjectId" });
      this.hasMany(models.ExpertSubject, { foreignKey: "subjectId" });
    }
  }
  Subject.init(
    {
      subjectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      subjectName: {
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
      modelName: "Subject",
    }
  );
  return Subject;
};
