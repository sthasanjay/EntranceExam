"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Discussions", {
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
      question: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      scopeCategoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      discussCategoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      isReported: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      isDisabled: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      replyCount: {
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
    await queryInterface.dropTable("Discussions");
  },
};
