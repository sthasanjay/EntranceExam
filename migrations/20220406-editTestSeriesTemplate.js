"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        "TestSeriesTemplates", // table name
        "isFree", // new field name
        {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        }
      )
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.removeColumn("TestSeriesTemplates", "isFree"),
    ]);
  },
};
