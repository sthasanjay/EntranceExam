"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        "UserTestSeriesLogs", // table name
        "duration", // new field name
        {
          type: Sequelize.INTEGER,
          defaultValue: 0,
        }
      ),
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.removeColumn("UserTestSeriesLogs", "duration"),
    ]);
  },
};
