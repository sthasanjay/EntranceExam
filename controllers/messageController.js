const path = require("path");
const fs = require("fs");
const { promisify } = require("util");
const { Message, MessageContact, User } = require("../models");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const sequelize = require("sequelize");
const { v4 } = require("uuid");
/* 
    @desc Create Message
    @route POST /api/v1/message/create/:roomId
    @access private
**/
exports.createMessage = catchAsync(async (req, res, next) => {
  let message;

  let msgContact = await MessageContact.findOne({
    where: {
      userId: req.user.id,
      messageRoom: req.params.roomId,
    },
  });
  if (!msgContact)
    return next(new AppError("Message Room Doesn't Exists", 400));

  // check whether the file exist or not
  if (!req.files || Object.keys(req.files).length === 0) {
    message = await Message.create({
      ...req.body,
      scopeCategoryId: msgContact.scopeCategoryId,
      messageToId: msgContact.messageWithId,
      messageFromId: req.user.id,
      messageRoom: req.params.roomId,
    });

    await MessageContact.update(
      {
        lastMessage: req.body.message,
        lastMessageIsImage: false,
        hasOpened: true,
      },
      { where: { messageRoom: req.params.roomId, userId: req.user.id } }
    );

    await MessageContact.update(
      {
        lastMessage: req.body.message,
        lastMessageIsImage: false,
        hasOpened: false,
      },
      {
        where: {
          messageRoom: req.params.roomId,
          messageWithId: msgContact.messageWithId,
        },
      }
    );
    await MessageContact.increment("unOpenedCount", {
      by: 1,
      where: { messageRoom: req.params.roomId, messageWithId: msgContact.messageWithId },
    });
    // send response
    res.status(201).json({
      status: "success",
      data: { message },
    });
  } else {
    let file = req.files.file;
    // Make sure the image is a photo
    if (!file.mimetype.startsWith("image")) {
      return next(new AppError("Please upload an image file", 400));
    }

    // Create custom filename
    file.name = `message_${v4()}${path.parse(file.name).ext}`;

    file.mv(
      `${process.env.MESSAGE_FILE_UPLOAD_PATH}/${file.name}`,
      async (err) => {
        if (err) {
          console.error(err);
          return next(new AppError(`Problem with file upload`, 500));
        }

        message = await Message.create({
          ...req.body,
          image: file.name,
          messageToId: msgContact.messageWithId,
          messageFromId: req.user.id,
          messageRoom: req.params.roomId,
        });

        await MessageContact.update(
          {
            lastMessage: req.body.message,
            lastMessageIsImage: true,
            hasOpened: true,
          },
          { where: { messageRoom: req.params.roomId, userId: req.user.id } }
        );

        await MessageContact.update(
          {
            lastMessage: req.body.message,
            lastMessageIsImage: true,
            hasOpened: false,
          },
          {
            where: {
              messageRoom: req.params.roomId,
              messageWithId: msgContact.messageWithId,
            },
          }
        );
        await MessageContact.increment("unOpenedCount", {
          by: 1,
          where: { messageRoom: req.params.roomId, messageWithId: msgContact.messageWithId },
        });
        res.status(200).json({
          status: "success",
          data: { message },
        });
      }
    );
  }
});

/* 
    @desc Get one Message
    @route GET /api/v1/message/getOne/:id
    @access private
**/
exports.getOneMessage = catchAsync(async (req, res, next) => {
  const message = await Message.findOne({
    where: {
      id: req.params.id,
    },
  });
  // check whether the Message exist or not
  if (!message) return next(new AppError("Message not found", 404));

  res.status(200).json({
    status: "success",
    data: {
      message,
    },
  });
});

/* 
    @desc Get Message list by Room
    @route GET /api/v1/message/getByRoom/:roomId
    @access private
**/
exports.getAllMessageByRoom = catchAsync(async (req, res, next) => {
  let result;

  result = await Message.findAll({
    where: { messageRoom: req.params.roomId },
    order: [["id", "DESC"]],
  });

  //send response
  res.status(200).json({
    status: "success",
    data: {
      result,
    },
  });
});
