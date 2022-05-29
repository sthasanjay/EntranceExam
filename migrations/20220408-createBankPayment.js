"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("BankPayments", {
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
      bankId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      subscriptionPlanId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      requestId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      depositerName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      contactNumber: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      depositedAmount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      depositedDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      depositedImage: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      remarks: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      paymentStatus: {
        type: Sequelize.ENUM,
        values: ["approved", "rejected", "pending"],
        defaultValue: "pending",
      },
      approvedBy: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      approvedDate: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable("BankPayments");
  },
};
