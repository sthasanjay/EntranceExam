"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("UserTestSeriesLogs", {
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
      templateId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      correctCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      wrongCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      reportCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      attemptedCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
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
    await queryInterface.dropTable("UserTestSeriesLogs");
  },
};
