"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("SmartGatewayCredentials", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      payKey: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      viewKey: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      callBackUrl: {
        type: Sequelize.STRING,
        allowNull: false,
      },
       credType: {
        type: Sequelize.ENUM,
        values: ["production", "development", "demo"],
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
    await queryInterface.dropTable("SmartGatewayCredentials");
  },
};
