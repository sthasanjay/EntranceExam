"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        "UserTestSeriesLogs", // table name
        "templateType", // new field name
        {
          type: Sequelize.STRING,
          allowNull: true,
        }
      ),
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.removeColumn("UserTestSeriesLogs", "isFree"),
    ]);
  },
};
