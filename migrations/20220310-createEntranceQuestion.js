"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("EntranceQuestions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      questionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      levelId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      courseId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      subjectId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      chapterId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      weight: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      question: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      option1: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      option2: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      option3: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      option4: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      correctAnswer: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      correctOption: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      addHint: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      uploadFile: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      modifiedDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      remarks: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      isExamReserved: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      isApiUpload: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      isOldData: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
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
    await queryInterface.dropTable("EntranceQuestions");
  },
};
