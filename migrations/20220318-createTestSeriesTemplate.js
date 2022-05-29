"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("TestSeriesTemplates", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      seriesName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      activationDate:{ 
        type: Sequelize.DATE,
        allowNull: false
      },
      endDate:{ 
        type: Sequelize.DATE,
        allowNull: false
      },
      questionCount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      templateType: {
        type: Sequelize.ENUM,
        values: ["mock", "daily", "free"],
        defaultValue: "mock",
        allowNull: true,
      },
      scopeCategoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    await queryInterface.dropTable("TestSeriesTemplates");
  },
};
