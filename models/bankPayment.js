"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BankPayment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BankPayment.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      bankId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      subscriptionPlanId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      requestId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      depositerName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contactNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      depositedAmount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      depositedDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      depositedImage: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      remarks: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      paymentStatus: {
        type: DataTypes.ENUM,
        values: ["approved", "rejected", "pending"],
        defaultValue: "pending",
      },
      approvedBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      approvedDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "BankPayment",
    }
  );
  return BankPayment;
};
