"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        "ExpertProfiles", // table name
        "expertSubjectId", // new field name
        {
            type: Sequelize.INTEGER,
            allowNull: true,
        }
      ),
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.removeColumn("ExpertProfiles", "expertSubjectId"),
    ]);
  },
};
