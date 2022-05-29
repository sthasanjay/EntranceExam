"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("UserTestSeriesQuestions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      testSeriesLogId: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
      questionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      subjectId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      chapterId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      selectedAnswer: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      isCorrect: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      hasAttemted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      isReported: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      questionReportId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      reportedText: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("UserTestSeriesQuestions");
  },
};
