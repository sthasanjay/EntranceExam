"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("SubscriptionPlans", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      scopeCategoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      subscriptionTitle: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      subscriptionDescription: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      durationInDays: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      isDiscounted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      discountedAmount: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      discountedType: {
        type: Sequelize.ENUM,
        values: ["amount", "percentage"],
        allowNull: true,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      activationDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      endDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("SubscriptionPlans");
  },
};
