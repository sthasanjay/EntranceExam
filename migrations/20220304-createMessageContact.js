"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("MessageContacts", {
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
      messageWithId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      messageRoom: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastMessage: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      lastMessageIsImage: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      hasOpened: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      unOpenedCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      isDisabled: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      isDeleted: {
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
    await queryInterface.dropTable("MessageContacts");
  },
};
