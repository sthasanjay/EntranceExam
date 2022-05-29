"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("TransactionHistories", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      scopeCategoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      subscriptionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      requestId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      requestDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      callBackReceived: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      callBackStatus: {
        type: Sequelize.ENUM,
        values: ["SUCCESS", "FAILED", "CANCELLED"],
        allowNull: true,
      },
      callBackTransactionId: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      callBackRefId: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      callBackAgent: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      payMethod: {
        type: Sequelize.ENUM,
        values: ["ESEWA", "KHALTI", "CONNECTIPS", "BANK", "MANUAL"],
        allowNull: false,
      },
      bankPaymentId: {
        type: Sequelize.INTEGER,
        allowNull: true,
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
    await queryInterface.dropTable("TransactionHistories");
  },
};
