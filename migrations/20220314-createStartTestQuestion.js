"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("StartTestQuestions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      startTestLogId: {
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
      questionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      chapterId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      subjectId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      levelId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      selectedAnswer: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      hasAttempted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      isCorrect: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
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
    await queryInterface.dropTable("StartTestQuestions");
  },
};
