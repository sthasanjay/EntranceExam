"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        validate: {
          isEmail: true,
        },
        allowNull: false,
        unique: true,
      },
      role: {
        type: Sequelize.ENUM,
        values: ["freeUser", "admin", "paidUser", "expert", "dataEntry"],
        allowNull: false,
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          max: 10,
        },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          min: 8,
        },
      },
      passwordConfirm: {
        type: Sequelize.STRING,
        // allowNull: false,
        validate: {
          isMatch(value) {
            if (value !== this.password) {
              throw new Error("Password do not match with confirm password!");
            }
          },
        },
      },
      passwordChangedAt: Sequelize.DATE,
      passwordResetToken: Sequelize.STRING,
      passwordResetExpires: Sequelize.DATE,
      lastLogin: Sequelize.DATE,
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
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
  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.dropTable("Users"),
        queryInterface.sequelize.query(
          'DROP TYPE IF EXISTS "enum_Users_role";'
        ),
      ]);
    });
  },
};
