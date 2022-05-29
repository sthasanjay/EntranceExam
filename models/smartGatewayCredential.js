"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SmartGatewayCredential extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SmartGatewayCredential.init(
    {
      payKey: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      viewKey: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      callBackUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
       credType: {
        type: DataTypes.ENUM,
        values: ["production", "development", "demo"],
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "SmartGatewayCredential",
    }
  );
  return SmartGatewayCredential;
};
