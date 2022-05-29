const path = require("path");
const fs = require("fs");
const { promisify } = require("util");
const { Message, MessageContact, User } = require("../models");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { v4 } = require("uuid");
/* 
    @desc Create MessageContact
    @route POST /api/v1/messageContact/create
    @access private
**/
exports.createMessageContact = catchAsync(async (req, res, next) => {
  //1 Check if msgTo user exist or not
  let msgTo = await User.findOne({
    where: {
      id: req.body.messageToId,
      role: "expert",
    },
  });
  if (!msgTo) return next(new AppError("This user Doesnt Exist", 400));
  //2 check if same MessageContact exist or not
  let msgContact = await MessageContact.findOne({
    where: {
      userId: req.user.id,
      messageWithId: req.body.messageToId,
    },
  });
  // 2.a if MessageContact not exist, create
  if (!msgContact) {
    let messageRoom = `room_${v4()}`;
    msgContact = await MessageContact.create({
      userId: req.user.id,
      messageWithId: req.body.messageToId,
      messageRoom,
      scopeCategoryId: req.query.scopeCategoryId,
    });
    // converse Message Contact Data
    await MessageContact.create({
      userId: req.body.messageToId,
      messageWithId: req.user.id,
      messageRoom,
      scopeCategoryId: req.query.scopeCategoryId,
    });
  }

  res.status(200).json({
    status: "success",
    data: { msgContact },
  });
});

/* 
    @desc Get one MessageContact
    @route GET /api/v1/messageContact/getByUser
    @access private
**/
exports.getMessageContactByUser = catchAsync(async (req, res, next) => {
  const messageContact = await MessageContact.findAll({
    where: {
      userId: req.user.id,
    },
    include: [
      {
        model: User,
        attributes: [
          "id",
          "firstName",
          "lastName",
          "email",
          "profileImage",
          "role",
        ],
      },
    ],
  });

  res.status(200).json({
    status: "success",
    data: {
      messageContact,
    },
  });
});
