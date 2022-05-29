"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Discussion, { foreignKey: "userId" });
      this.hasMany(models.DiscussionReply, { foreignKey: "userId" });
      this.hasMany(models.MessageContact, { foreignKey: "messageWithId" });
      this.hasMany(models.UserTestSeriesLog, { foreignKey: "userId" });
      this.hasMany(models.UserSubscription, { foreignKey: "userId" });
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,

        allowNull: false,
        unique: true,
      },
      profileImage: {
        type: DataTypes.STRING,
        defaultValue: "/avatar.png",
      },
      role: {
        type: DataTypes.ENUM,
        values: ["freeUser", "admin", "paidUser", "expert", "dataEntry"],
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          min: 10,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          min: 8,
        },
      },
      passwordConfirm: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isMatch(value) {
            if (value !== this.password) {
              throw new Error("Password do not match with confirm password!");
            }
          },
        },
      },
      passwordChangedAt: DataTypes.DATE,
      passwordResetToken: DataTypes.STRING,
      passwordResetExpires: DataTypes.DATE,
      lastLogin: DataTypes.DATE,
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  //Before hook to hash password
  User.beforeCreate(async (user, options) => {
    // Hash the password with cost of 12
    user.password = await bcrypt.hash(user.password, 12);
    // Delete passwordConfirm field
    user.passwordConfirm = undefined;
  });
  //Instace method to check passwords
  User.prototype.correctPassword = async function (
    candidatePassword,
    userPassword
  ) {
    return await bcrypt.compare(candidatePassword, userPassword);
  };
  //Instance method to set passwordchanged time
  User.prototype.changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
      const changedTimestamp = parseInt(
        this.passwordChangedAt.getTime() / 1000,
        10
      );

      return JWTTimestamp < changedTimestamp;
    }

    // False means NOT changed
    return false;
  };
  //Instance to create reset password token
  User.prototype.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString("hex");

    this.passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    this.passwordResetExpires = Date.now() + 30 * 60 * 1000;

    return resetToken;
  };
  return User;
};
