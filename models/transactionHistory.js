"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TransactionHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.SubscriptionPlan, { foreignKey: "subscriptionId" });
    }
  }
  TransactionHistory.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      scopeCategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      subscriptionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      requestId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      requestDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      callBackReceived: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      callBackStatus: {
        type: DataTypes.ENUM,
        values: ["SUCCESS", "FAILED", "CANCELLED"],
        allowNull: true,
      },
      callBackTransactionId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      callBackRefId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      callBackAgent: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      payMethod: {
        type: DataTypes.ENUM,
        values: ["ESEWA", "KHALTI", "CONNECTIPS", "BANK", "MANUAL"],
        allowNull: false,
      },
      bankPaymentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "TransactionHistory",
    }
  );
  return TransactionHistory;
};
