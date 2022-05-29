"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("DiscussionReplies", {
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
      discussionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      replyMessage: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      replyImage: {
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
      parentDiscussionReplyId: {
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
    await queryInterface.dropTable("DiscussionReplies");
  },
};
