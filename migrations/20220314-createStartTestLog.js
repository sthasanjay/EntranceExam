"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("StartTestLogs", {
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
      totalQuestionCount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      attemptedCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      correctCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      wrongCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      isSubmitted: {
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
    await queryInterface.dropTable("StartTestLogs");
  },
};
