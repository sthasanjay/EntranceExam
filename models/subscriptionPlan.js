"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SubscriptionPlan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.TransactionHistory, { foreignKey: "subscriptionId" });
    }
  }
  SubscriptionPlan.init(
    {
      scopeCategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      subscriptionTitle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subscriptionDescription: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      durationInDays: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      amount: { 
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      isDiscounted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      discountedAmount: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      discountedType: {
        type: DataTypes.ENUM,
        values: ["amount", "percentage"],
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      activationDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "SubscriptionPlan",
    }
  );
  return SubscriptionPlan;
};
