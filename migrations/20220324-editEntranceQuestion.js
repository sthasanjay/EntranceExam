"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        "EntranceQuestions", // table name
        "isModelQuestion", // new field name
        {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        }
      ),
      queryInterface.addColumn(
        "EntranceQuestions", // table name
        "isFreeQuestion", // new field name
        {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        }
      ),
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.removeColumn("EntranceQuestions", "isModelQuestion"),
      await queryInterface.removeColumn("EntranceQuestions", "isFreeQuestion"),
    ]);
  },
};
